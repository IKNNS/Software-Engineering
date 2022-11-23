import {
    Button,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    Alert
} from "@mui/material";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import type { NextPage } from 'next'
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { useRouter } from "next/router";

import { getAuth, GoogleAuthProvider, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GetUserAccount, CreateUserAccount } from 'libs/firebase/userData';

import Google from 'assets/images/google.svg'
import Loading from "components/common/loading";
import Image from "next/image";
import { UserAccount } from "@models/User_Model";
import { useAuth } from "@libs/firebase/useAuth";

const auth = getAuth();

const RegisterPage: NextPage = () => {

    return (
        <div className="w-sceen h-screen flex flex-col bg-bg justify-center items-center">
            <div className=' md:w-[450px] md:h-auto h-full w-full
            flex flex-col justify-center items-center
            bg-white py-5 px-5 rounded-md shadow-md text-base'>
                <div className='text-black font-medium text-2xl w-full text-center mb-5'>สมัครสมาชิค</div>
                <Form />
            </div>
        </div>
    )
}
export default RegisterPage


const errorName = (str: string) => {
    if (str.length == 0)
        return true;
    else if (str.match(/[^\u0E00-\u0E7FA-Z]/ig))
        return true;
    else
        return false;
}

const errorText = [
    '',
    'โปรดตรวจสอบชื่อของคุณ',
    'โปรดตรวจสอบนามสกุลของคุณ',
    'รหัสต้องมีมากกว่า 8 ตัวอักษร',
    'รหัสไม่ตรงกัน',
    'บัญชีนี้ถูกลงทะเบียนไว้อยู่แล้ว'
]

const Form: React.FC = () => {

    const router = useRouter();
    const provider = new GoogleAuthProvider();
    const [user, loading] = useAuth(auth);

    const [data, setData] = useState<UserAccount>({ uid: '', email: '', firstname: '', lastname: '' });
    const [password, setPassword] = useState({ main: "", confirm: "" });
    const [hidden, setHidden] = useState({ main: false, confirm: false });

    const [err, setError] = useState(0);
    const [onLoading, setOnLoad] = useState(false)

    useEffect(() => {
        if (!loading && user) {
            router.push('/home')
        }
    }, [user, loading])

    const checkError = () => {
        let err = 0;
        if (errorName(data.firstname))
            err = 1;
        else if (errorName(data.lastname))
            err = 2
        else if (password.main.length < 8)
            err = 3
        else if (password.main !== password.confirm)
            err = 4
        setError(err);
        return err != 0;
    }

    const onSubmit = async () => {

        if (checkError()) return;

        setOnLoad(true);
        try {
            const accounts = await fetchSignInMethodsForEmail(auth, data.email);
            if (accounts.length > 0) {
                setError(5);
                setOnLoad(false);
            }
            else {
                await createUserWithEmailAndPassword(auth, data.email, password.main)
                await CreateUserAccount(data)
                router.push('/login')
            }
        } catch (e) {
            console.log(e);
            setOnLoad(false);
        }
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const { uid, displayName, email } = result.user
            const data = await GetUserAccount(uid);
            if (!data.data()) {
                const [firstname, lastname] = displayName?.split(' ') ?? ['', ''];
                await CreateUserAccount({ uid, email: email ?? '', firstname, lastname })
            }
            router.push('/home')
        } catch (e) { console.log(e) }
    }

    if (onLoading) return <Loading />

    return (
        <form className="flex flex-col gap-3 w-full" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            {err != 0 && <Alert severity="error">{errorText[err]}</Alert>}
            <div
                className='flex flex-row w-full p-2 bg-white shadow-md rounded-md border border-solid border-slate-200 items-center justify-center hover:cursor-pointer'
                onClick={signInWithGoogle}
            >
                <Image src={Google} width={20} height={20} alt='google-logo' />
                <div className='ml-3 text-base'>เข้าสู่ระบบด้วย Google</div>
            </div>
            <div className='text-lg w-full text-center font-light'>หรือ</div>
            <Stack direction={'row'} justifyContent='space-between' spacing={1}>
                <TextField
                    className='bg-white'
                    error={err == 1}
                    value={data.firstname}
                    onChange={(e) => setData({ ...data, firstname: e.target.value })}
                    fullWidth required
                    label={<div className='font-kanit inline-block'  >ชื่อ</div>}
                    variant="outlined"
                />
                <TextField
                    className='bg-white'
                    error={err == 2}
                    value={data.lastname}
                    onChange={(e) => setData({ ...data, lastname: e.target.value })}
                    fullWidth
                    required
                    label={<div className='font-kanit inline-block'  >นามสกุล</div>}
                    variant="outlined"
                />
            </Stack>
            <TextField
                className='bg-white'
                error={err == 5}
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                fullWidth
                required
                label={<div className='font-kanit inline-block'  >อีเมล</div>}
                variant="outlined"
                type={'email'}
            />
            <FormControl variant='outlined' required className='w-full' error={err == 3}>
                <InputLabel htmlFor="password-input" className='font-kanit' >รหัสผ่าน</InputLabel>
                <OutlinedInput
                    value={password.main} onChange={(e) => setPassword({ ...password, main: e.target.value })}
                    id='password-input'
                    required
                    className='bg-white'
                    fullWidth type={!hidden.main ? 'text' : 'password'}
                    label="รหัสผ่าน"
                    endAdornment={
                        <div className='hover:cursor-pointer flex items-center' onClick={(e) => setHidden({ ...hidden, main: !hidden.main })}>
                            {!hidden.main ? <VisibilityOffRounded /> : <VisibilityRounded />}
                        </div>
                    }
                />
            </FormControl>
            <FormControl variant='outlined' required className='w-full' error={err == 4}>
                <InputLabel htmlFor="password-input2" className='font-kanit'>ยืนยันรหัสผ่าน</InputLabel>
                <OutlinedInput
                    value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    id='password-input2'
                    required
                    className='bg-white'
                    fullWidth type={!hidden.confirm ? 'text' : 'password'}
                    label="ยืนยันรหัสผ่าน"
                    endAdornment={
                        <div className='hover:cursor-pointer flex items-center' onClick={(e) => setHidden({ ...hidden, confirm: !hidden.main })}>
                            {!hidden.confirm ? <VisibilityOffRounded /> : <VisibilityRounded />}
                        </div>
                    }
                />
            </FormControl>
            <Stack direction={'row'} justifyContent='space-between' className='mt-5'>
                <div className='py-2 px-5 font-kanit text-base hover:cursor-pointer' onClick={() => { auth.signOut(); router.push('/login') }}>กลับ</div>
                <Button type="submit" variant='contained' color='info' className='py-2 px-5 font-kanit text-base'>ตกลง</Button>
            </Stack>
        </form>
    )
}
import {
    Button,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import React, { ChangeEventHandler, useState } from "react";
import type { NextPage } from 'next'
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { useRouter } from "next/router";

import { getAuth, GoogleAuthProvider, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useAuth } from '@firebase/Hook';
import { GetUserAccount, CreateUserAccount } from '@firebase/Hook/data';

import Google from 'assets/images/google.svg'
import Loading from "components/common/loading";
import Image from "next/image";

const auth = getAuth();

const RegisterPage: NextPage = () => {

    return (
        <div className="w-sceen h-screen flex flex-col bg-bg justify-center items-center">
            <div className=' md:w-[450px] md:h-auto h-full w-full flex flex-col md:justify-center justify-between items-center md:bg-white bg-transparent py-5 px-5 rounded-md shadow-md text-base'>
                <div className='text-black font-medium text-2xl w-full text-center mb-10'>สมัครสมาชิค</div>
                <Form />
            </div>
        </div>
    )
}
export default RegisterPage

const Form: React.FC = () => {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [emailaddress, setEmail] = useState<string>('');
    const [password, setPassword] = useState({ pass: '', confirm: '' });
    const [hidden, setHidden] = useState({ pass: true, confirm: true })
    const [err, setError] = useState({ name: false, lastname: false, email: false, pass: false, confirm: false });
    const [loading, setLoading] = useState(false)

    const provider = new GoogleAuthProvider();

    const handleNameInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        if (value.length == 0)
            setError({ ...err, name: true })
        else if (value.match(/[^\u0E00-\u0E7FA-Z]/ig))
            setError({ ...err, name: true })
        else
            setError({ ...err, name: false })
        setName(value);
    }

    const handleLastNameInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        if (value.length == 0)
            setError({ ...err, lastname: true })
        else if (value.match(/[^\u0E00-\u0E7FA-Z]/ig))
            setError({ ...err, lastname: true })
        else
            setError({ ...err, lastname: false })
        setLastname(value);
    }

    const handleEmailInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setError({ ...err, email: false })
        setEmail(value);
    }

    const handlePasswordInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setError({ ...err, pass: false, confirm: value !== password.confirm })
        setPassword({ ...password, pass: value });
    }

    const handlePasswordInput2: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setError({ ...err, confirm: value !== password.pass })
        setPassword({ ...password, confirm: value });
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const data = await GetUserAccount(result.user.uid);
            if (data.size == 0) {
                const name = result.user.displayName?.split(' ');
                await CreateUserAccount(result.user.email!, name![0], name![1], result.user.uid)
            }
            router.push('/home')
        } catch (e) { console.log(e) }
    }

    const onSubmit = async () => {

        if (password.pass.length < 8) {
            setError({ ...err, pass: true })
            return;
        }
        if (err.email || err.pass || err.confirm)
            return;

        setLoading(true);
        try {

            const accounts = await fetchSignInMethodsForEmail(auth, emailaddress);

            if (accounts.length != 0)
                return setError({ ...err, email: true });

            const result = await createUserWithEmailAndPassword(auth, emailaddress, password.pass)
            await CreateUserAccount(emailaddress, name, lastname, result.user.uid)
            router.push('/home')

        } catch (e) { console.log(e) }
        setLoading(false);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <form className="flex flex-col gap-3 w-full" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className='flex flex-row w-full p-2 bg-white shadow-md rounded-md border border-solid border-slate-200 items-center justify-center hover:cursor-pointer' onClick={signInWithGoogle}>
                <Image src={Google} width={20} height={20} alt='google-logo' />
                <div className='ml-3 text-base'>เข้าสู่ระบบด้วย Google</div>
            </div>
            <div className='text-lg w-full text-center font-light'>หรือ</div>
            <Stack direction={'row'} justifyContent='space-between' spacing={1}>
                <TextField className='bg-white' error={err.name} value={name} onChange={handleNameInput} fullWidth required label={<div className='font-kanit inline-block'  >ชื่อ</div>} variant="outlined" />
                <TextField className='bg-white' error={err.lastname} value={lastname} onChange={handleLastNameInput} fullWidth required label={<div className='font-kanit inline-block'  >นามสกุล</div>} variant="outlined" />
            </Stack>
            <TextField className='bg-white' error={err.email} value={emailaddress} onChange={handleEmailInput} fullWidth required label={<div className='font-kanit inline-block'  >อีเมล</div>} variant="outlined" type={'email'} />
            <FormControl variant='outlined' required className='w-full' error={err.pass}>
                <InputLabel htmlFor="password-input" className='font-kanit' >รหัสผ่าน</InputLabel>
                <OutlinedInput
                    value={password.pass} onChange={handlePasswordInput}
                    id='password-input'
                    required
                    className='bg-white'
                    fullWidth type={!hidden.pass ? 'text' : 'password'}
                    label="รหัสผ่าน"
                    endAdornment={!hidden.pass ?
                        <VisibilityOffRounded className='hover:cursor-pointer' onClick={() => setHidden({ ...hidden, pass: !hidden.pass })} /> :
                        <VisibilityRounded className='hover:cursor-pointer' onClick={() => setHidden({ ...hidden, pass: !hidden.pass })} />}
                />
            </FormControl>
            <FormControl variant='outlined' required className='w-full' error={err.confirm}>
                <InputLabel htmlFor="password-input2" className='font-kanit'>ยืนยันรหัสผ่าน</InputLabel>
                <OutlinedInput
                    value={password.confirm} onChange={handlePasswordInput2}
                    id='password-input2'
                    required
                    className='bg-white'
                    fullWidth type={!hidden.confirm ? 'text' : 'password'}
                    label="ยืนยันรหัสผ่าน"
                    endAdornment={!hidden.confirm ?
                        <VisibilityOffRounded className='hover:cursor-pointer' onClick={() => setHidden({ ...hidden, confirm: !hidden.confirm })} /> :
                        <VisibilityRounded className='hover:cursor-pointer' onClick={() => setHidden({ ...hidden, confirm: !hidden.confirm })} />}
                />
            </FormControl>
            <Stack direction={'row'} justifyContent='end' className='mt-5'>
                <div className='py-2 px-5 font-kanit text-base hover:cursor-pointer' onClick={() => { auth.signOut(); router.push('/login') }}>กลับ</div>
                <Button type="submit" variant='contained' color='info' className='py-2 px-5 font-kanit text-base'>ต่อไป</Button>
            </Stack>
        </form>
    )
}
import React, { useEffect } from 'react';
import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import { FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from 'components/common/loading'
import Google from 'assets/images/google.svg'
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, } from 'firebase/auth'
import { useAuth } from '@firebase/Hook';
import { GetUserAccount, CreateUserAccount } from '@firebase/Hook/data';
import Image from 'next/image';

const auth = getAuth();

const Login: NextPage = () => {

    const [user, loading] = useAuth(auth);
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [err, setError] = useState({ email: false, password: false });
    const [viewPass, setViewPass] = useState(false)

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

    const signInWithAccount = async () => {
        if (password.length < 8) {
            setError({ ...err, password: true })
            return;
        }
        signInWithEmailAndPassword(auth, email, password).then((value) => {
            console.log(value);
        }).catch(() => {
            setError({ email: true, password: true })
        })
    }

    const handleEmailInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setError({ email: false, password: false })
        setEmail(value);
    }

    const handlePasswordInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setError({ email: false, password: false })
        setPassword(value);
    }

    useEffect(() => {
        
        if (user) router.push('/home')

    }, [user])

    return (
        <div className={` w-sceen h-screen flex flex-col bg-bg justify-center items-center`}>
            {(user || loading) && <Loading screen />}
            <form className=' md:w-[350px] md:h-auto h-full w-full flex flex-col md:justify-center justify-between items-center md:bg-white bg-transparent py-5 px-5 rounded-md shadow-md text-base' onSubmit={(e) => { e.preventDefault(); signInWithAccount() }}>
                <div className='text-black font-medium text-2xl w-full text-center mb-10'>ลงชื่อเข้าใช้</div>
                <div className='w-full flex flex-col gap-3'>
                    <TextField
                        required error={err.email} value={email}
                        onChange={handleEmailInput} type="email" className=' bg-white'
                        fullWidth label={<div className='font-kanit inline-block'>อีเมล</div>} variant='outlined'
                    />
                    <FormControl variant='outlined' required fullWidth>
                        <InputLabel htmlFor="password-input" error={err.password} className='font-kanit'>รหัสผ่าน</InputLabel>
                        <OutlinedInput
                            id='password-input'
                            required error={err.password} value={password}
                            onChange={handlePasswordInput} className='bg-white'
                            fullWidth type={viewPass ? 'text' : 'password'}
                            label="รหัสผ่าน"
                            endAdornment={viewPass ?
                                <VisibilityOffRounded className='hover:cursor-pointer' onClick={() => setViewPass(!viewPass)} /> :
                                <VisibilityRounded className='hover:cursor-pointer' onClick={() => setViewPass(!viewPass)} />}
                        />
                    </FormControl>
                    <div className='w-full text-right font-light text-blue-600 hover:cursor-pointer' onClick={() => router.push('/reset')}>ลืมรหัสใช่ไหม?</div>
                    <Button className='p-2 font-kanit text-base' fullWidth variant='contained' type='submit'>เข้าสู่ระบบ</Button>
                    <div className='text-lg w-full text-center font-light'>หรือ</div>
                    <div className='flex flex-row w-full p-2 bg-white shadow-md rounded-md border border-solid border-slate-200 items-center justify-center hover:cursor-pointer' onClick={signInWithGoogle}>
                        <Image src={Google} width={20} height={20} alt='google-logo' />
                        <div className='ml-3 text-base'>เข้าสู่ระบบด้วย Google</div>
                    </div>
                    <div className=' flex flex-row text-stone-600 w-full justify-center font-light'>
                        <p>ไม่มีบัญชีใช่ไหม?</p><p className='ml-1 text-blue-600 hover:cursor-pointer' onClick={() => router.push('/regis')}>ลงทะเบียนที่นี่</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
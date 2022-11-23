import React, { useEffect } from 'react';
import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import { Alert, FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from 'components/common/loading'
import Google from 'assets/images/google.svg'
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuth } from '@libs/firebase/useAuth';
import { CreateUserAccount, GetUserAccount } from '@libs/firebase/userData';
import Image from 'next/image';

const auth = getAuth();

const errorText = [
    '',
    'รหัสต้องมีมากกว่า 8 ตัวอักษร',
    'โปรดตรวจสอบอีเมลหรือรหัวผ่านให้ถูกต้อง',
]

const Login: NextPage = () => {

    const provider = new GoogleAuthProvider();
    const router = useRouter();
    const [user, loading] = useAuth(auth);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hidden, setHidden] = useState(true)
    const [err, setError] = useState(0);

    useEffect(() => {
        if (!loading && user) {
            router.push('/home')
        }
    }, [user, loading])

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const { uid, displayName, email } = result.user
            const data = await GetUserAccount(uid);
            if (!data.data()) {
                const [firstname, lastname] = displayName?.split(' ') ?? ['', ''];
                await CreateUserAccount({ uid, email: email ?? '', firstname, lastname })
            }
        } catch (e) { console.log(e) }
    }

    const signInWithAccount = async () => {
        setError(0);
        if (password.length < 8)
            return setError(1)

        signInWithEmailAndPassword(auth, email, password).catch(() => {
            setError(2)
        })
    }

    return (
        <div className={` w-sceen h-screen flex flex-col bg-bg justify-center items-center`}>
            {(loading) && <Loading screen />}
            <form className=' md:w-[450px] md:h-auto h-full w-full
            flex flex-col justify-center items-center
            bg-white py-5 px-5 rounded-md shadow-md text-base'
                onSubmit={(e) => { e.preventDefault(); signInWithAccount() }}
            >
                <div className='text-black font-medium text-2xl w-full text-center mb-10'>ลงชื่อเข้าใช้</div>
                <div className='w-full flex flex-col gap-3'>
                    {err != 0 && <Alert severity="error">{errorText[err]}</Alert>}
                    <TextField
                        required error={err == 2} value={email}
                        onChange={(e) => setEmail(e.target.value)} type="email" className=' bg-white'
                        fullWidth label={<div className='font-kanit inline-block'>อีเมล</div>} variant='outlined'
                    />
                    <FormControl variant='outlined' required fullWidth>
                        <InputLabel htmlFor="password-input" error={err != 0} className='font-kanit'>รหัสผ่าน</InputLabel>
                        <OutlinedInput
                            id='password-input'
                            required error={err != 0} value={password}
                            onChange={(e) => setPassword(e.target.value)} className='bg-white'
                            fullWidth type={!hidden ? 'text' : 'password'}
                            label="รหัสผ่าน"
                            endAdornment={
                                <div className='hover:cursor-pointer flex items-center' onClick={(e) => { e.preventDefault(); setHidden(!hidden) }}>
                                    {!hidden ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                </div>
                            }
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
import React from 'react';
import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import { FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from 'components/loading'
import Google from 'assets/images/google.svg'
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'

import { initFirebase } from '../firebase/FirebaseApp';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import FilledInput from '@mui/material/FilledInput';

const Login: NextPage = () => {

    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    
    const [emailaddress, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [err, setError] = useState({ email: false, password: false });
    const [viewPass, setViewPass] = useState(false)

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
    }
    const signInWithAccount = async () => {
        if (password.length < 8) {
            setError({ ...err, password: true })
            return;
        }
        signInWithEmailAndPassword(auth, emailaddress, password).then((value) => {
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

    const goToRegis = () => router.push('/regis')
    const goToReset = () => router.push('/reset')

    if (loading) {
        return <Loading />
    }

    if (user) {
        router.push('/home')
        return <Loading />
    }

    if (loading) {
        return <div>loading...</div>
    }

    if (user) {
        router.push('/home')
        return <div>{user.displayName}</div>
    }

    return (
        <div className={` w-sceen h-screen flex flex-col bg-bg justify-center items-center`}>
            <form className=' md:w-[350px] md:h-auto h-full w-full flex flex-col md:justify-center justify-between items-center md:bg-white bg-transparent p-5 rounded-md shadow-md text-base' onSubmit={(e) => { e.preventDefault(); signInWithAccount() }}>
                <div className='text-black font-medium text-2xl w-full text-center mb-10'>ลงชื่อเข้าใช้</div>
                <div className='w-full'>
                    <TextField
                        required error={err.email} value={emailaddress}
                        onChange={handleEmailInput} type="email" className='mb-5 bg-white'
                        fullWidth label="Enter username" variant='outlined'
                    />
                    <FormControl variant='outlined' required className='w-full mb-3'>
                        <InputLabel htmlFor="password-input" error={err.password}>Password</InputLabel>
                        <OutlinedInput
                            id='password-input'
                            required error={err.password} value={password}
                            onChange={handlePasswordInput} className='bg-white'
                            fullWidth type={viewPass ? 'text' : 'password'}
                            label="Password"
                            endAdornment={viewPass ?
                                <VisibilityOffRounded className='hover:cursor-pointer' onClick={() => setViewPass(!viewPass)} /> :
                                <VisibilityRounded className='hover:cursor-pointer' onClick={() => setViewPass(!viewPass)} />}
                        />
                    </FormControl>
                    <div className='mb-3 w-full text-right text-blue-600 hover:cursor-pointer' onClick={goToReset}>Forgot your password?</div>
                    <Button className='mb-1 p-2' fullWidth variant='contained' type='submit'>Sign in</Button>
                    <div className='mb-1 text-lg w-full text-center'>or</div>
                    <div className='flex flex-row w-full mb-3 p-2 bg-white shadow-md rounded-md border border-solid border-slate-200 items-center justify-center hover:cursor-pointer' onClick={signInWithGoogle}>
                        <Image src={Google} width={20} height={20} alt='google-logo' />
                        <div className='ml-3'>Sign in with Google</div>
                    </div>
                    <div className=' flex flex-row text-stone-600 w-full justify-center'>
                        <p>Not a member?</p><p className='ml-3 text-blue-600 hover:cursor-pointer' onClick={goToRegis}>Register now</p>
                    </div>
                </div>
            </form>
        </div>
    )
}



export default Login

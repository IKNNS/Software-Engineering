import React from 'react';
import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

import { initFirebase } from '../firebase/FirebaseApp';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/router';

const Login: NextPage = () => {

    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
    }
    const signInWithAccount = async () => {
        const result = await signInWithEmailAndPassword(auth, emailaddress, password)
        console.log(result);
    }

    const [emailaddress, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [err1, setError1] = useState<boolean>(false); // 0 : Error of username , 1 : Error of password
    const [err2, setError2] = useState<boolean>(false);

    const handleUsernameInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setEmail(value);
    }

    const handlePasswordInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setPassword(value);

        setError2(value.length < 8 || value.length > 16);
    }

    const onSubmit = () => {
        if (err1 || err2)
            console.log("Error");
        else
            signInWithAccount();
        console.log("OK");

    }

    const goToRegis = () => {
        router.push('/regis')
    }

    if (loading) {
        return <div>loading...</div>
    }

    if (user) {
        router.push('/home')
        return <div>{user.displayName}</div>
    }

    return (
        
        <div className={` px-8 pt-10 pb-20 w-sceen h-screen flex flex-col bg-primary justify-between items-center`}>
            <div className='text-black font-bold text-3xl '>ลงชื่อเข้าใช้</div>
            <form className=' w-full flex flex-col justify-center items-center' onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
                <TextField required error={err1} value={emailaddress} onChange={handleUsernameInput} type="email" className='mb-4 bg-white' fullWidth label="Enter username" variant='outlined' />
                <TextField required error={err2} value={password} onChange={handlePasswordInput} className='mb-3 bg-white' fullWidth label="Password" variant='outlined' type={'password'} />
                <div className='mb-3 w-full text-right text-blue-600'>Forgot your password?</div>
                <Button className='mb-4' fullWidth variant='contained' type='submit'>Sign in</Button>
                <p>or</p>
                <Button onClick={signInWithGoogle} className='mb-4' fullWidth variant='contained'>Sign in with Google</Button>
                <div className=' flex flex-row text-stone-600'>
                    <p>Not a member?</p><p className='ml-3 text-blue-600 hover:cursor-pointer' onClick={goToRegis}>Register now</p>
                </div>
            </form>
        </div>
    )
}



export default Login

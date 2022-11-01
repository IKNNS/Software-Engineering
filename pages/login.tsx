import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

import { initFirebase } from '../firebase/FirebaseApp';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/router';

const Login: NextPage = () => {

    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
    }

    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [err1, setError1] = useState<boolean>(false); // 0 : Error of username , 1 : Error of password
    const [err2, setError2] = useState<boolean>(false);

    const handleUsernameInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setUsername(value);

        if (value.length == 0) // if nothing : error
            setError1(true);
        else if (!value[0].match(/[A-Z]/i)) // if start not a-z or A-z : error = true
            setError1(true);
        else if (value.match(/\W/g)) // if include operator (-*/%) etc : error = true
            setError1(true);
        else
            setError1(false);
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
            console.log("OK");
    }

    const goToRegis = () => {
        router.push('/regis')
    }
    
    return (
        <div className={` px-8 pt-10 pb-20 w-sceen h-screen flex flex-col bg-primary justify-between items-center`}>
            <form className=' w-full flex flex-col justify-center items-center' onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
                <TextField required error={err1} value={username} onChange={handleUsernameInput} className='mb-4 bg-white' fullWidth label="Enter username" variant='outlined' />
                <TextField required error={err2} value={password} onChange={handlePasswordInput} className='mb-3 bg-white' fullWidth label="Password" variant='outlined' type={'password'} />
                <div className='mb-3 w-full text-right text-blue-600'>Forgot your password?</div>
                <Button className='mb-4' fullWidth variant='contained' type='submit'>Sign in</Button>
            <div className=' w-full flex flex-col justify-center items-center'>
                <TextField value={email} onChange={(event) => setEmail(event.target.value)} className='mb-4 bg-white' fullWidth label="Enter username" variant='outlined' />
                <TextField value={pass} onChange={(event) => setPass(event.target.value)} className='mb-2 bg-white' fullWidth label="Password" variant='outlined' />
                <div className='mb-2 w-full text-right text-blue-600'>Recovery Password</div>
                <Button onClick={clickLogin} className='mb-4' fullWidth variant='contained'>Sign in</Button>
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

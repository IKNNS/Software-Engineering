import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';

const Login: NextPage = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [err, setError] = useState<boolean[]>([false, false]); // 0 : Error of username , 1 : Error of password

    const handleUsernameInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setUsername(value);

        setError((old) => {

            old[0] = false; // default a not error
            if (value.length == 0) return err; // if nothing : return to newError

            if (!value[0].match(/\w/)) // if start not a-z or A-z : error = true
                old[0] = true;

            const not = value.match(/\W/g)?.length // if include operator (-*/%) etc : not = true / if not include operator : not = false
            if (not) // if not == true : err = true
                old[0] = true;

            return old; //return to newError
        });
    }

    const handlePasswordInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setPassword(value);

        setError((old) => {
            old[1] = value.length < 8 || value.length > 16;
            return old;
        });
    }

    const onSubmit = () => {

        console.log

    }

    return (
        <div className={` px-8 pt-10 pb-20 w-sceen h-screen flex flex-col bg-primary justify-between items-center`}>
            <div className='text-black font-bold text-3xl '>ลงชื่อเข้าใช้</div>
            <div className=' w-full flex flex-col justify-center items-center'>
                <TextField error={err[0]} value={username} onChange={handleUsernameInput} className='mb-4 bg-white' fullWidth label="Enter username" variant='outlined' />
                <TextField error={err[1]} value={password} onChange={handlePasswordInput} className='mb-2 bg-white' fullWidth label="Password" variant='outlined' type={'password'} />
                <div className='mb-2 w-full text-right text-blue-600'>Forgot your password?</div>
                <Button className='mb-4' fullWidth variant='contained'>Sign in</Button>
                <div className=' flex flex-row text-stone-600'>
                    <p>Not a member?</p><p className='ml-3 text-blue-600'>Register now</p>
                </div>
            </div>
        </div>
    )
}



export default Login

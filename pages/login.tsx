import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';

const Login: NextPage = () => {

    const [username,setUsername] = useState<string>('');
    const [pass,setPass] = useState<string>('')

    const ClickLogin = ()=>{
        console.log(username);
    }

    return (
        <div className={` px-8 pt-10 pb-20 w-sceen h-screen flex flex-col bg-primary justify-between items-center`}>
            <div className='text-black font-bold text-3xl '>ลงชื่อเข้าใช้</div>
            <div className=' w-full flex flex-col justify-center items-center'>
                Hello  {username }
                <TextField value={username} onChange={(event)=>setUsername(event.target.value)} className='mb-4 bg-white' fullWidth label="Enter username" variant='outlined' />
                <TextField  className='mb-2 bg-white' fullWidth label="Password" variant='outlined' />
                <div className='mb-2 w-full text-right text-blue-600'>Recovery Password</div>
                <Button onClick={ClickLogin} className='mb-4' fullWidth variant='contained'>Sign in</Button>
                <div className=' flex flex-row text-stone-600'>
                    <p>Not a member?</p><p className='ml-3 text-blue-600'>Register now</p>
                </div>
            </div>

        </div>
    )
}



export default Login

import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const Home: NextPage = () => {
    return (
        <div className={` w-sceen min-h-screen flex flex-col bg-primary justify-between items-center`}>
            <div className='text-black'>ลงชื่อเข้าใช้</div>
            <div className=' w-full flex flex-col justify-center items-center'>
                <TextField label="Enter username" variant='outlined' />
                <TextField label="Password" variant='outlined' />
                <div className='w-full text-right text-blue-600'>Recovery Password</div>
                <Button variant='contained'>Sign in</Button>
                <div className=' text-stone-600'>
                    Not a member? <p className='text-blue-600'>Register now</p>
                </div>
            </div>

        </div>
    )
}



export default Home

import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';

const Noti: NextPage = () => {
    return (
        <div className={styles.container}>
            <div>
                Notification
            </div>
            <Button variant="contained">Contained</Button>
        </div>
    )
}

export default Noti

import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <div>
                Test Mui
            </div>
            <Button variant="contained">Contained</Button>
        </div>
    )
}

export default Home

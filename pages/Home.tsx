import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';

const Regis: NextPage = () => {
    return (
        <div className={styles.container}>
            <div>
                Home
            </div>
            <Button variant="contained">Contained</Button>
        </div>
    )
}

export default Regis

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import styles from '../styles/Home.module.css'
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@libs/firebase/useAuth';
import { useRouter } from 'next/router';
import { GetUserAccount } from '@libs/firebase/userData';
import { useState } from 'react';
import Loading from 'components/common/loading';
import Registerfood from 'components/registerfood';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const auth = getAuth();

export default function BasicStack() {

    const router = useRouter();
    const [user, loading] = useAuth(auth);

    const [step, setStep] = useState(0);
    const [openLoad, setOpenLoad] = useState(false);

    const loadData = async () => {
        if (!user) return;
        const data = await GetUserAccount(user.uid);
        if (!data.get("info")) {
            setStep(1);
            setTimeout(() => setStep(2), 300);
        } else {
            setStep(step == 2 ? 1 : 0);
            setTimeout(() => setStep(0), 400);
        }
    }

    const onRegis = (isSubmit: boolean) => {
        if (isSubmit) {
            setOpenLoad(true);
        } else {
            setOpenLoad(false);
            loadData();
        }
    }

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
            return;
        }
        loadData();

    }, [user, loading])

    return (
        <div className={styles.container}>
            {(loading || openLoad) && <Loading screen />}
            {(step > 0) && <Registerfood step={step} uid={user?.uid ?? ""} onSubmit={onRegis} />}
            <div>
                <h1 className={styles.title}>
                    Suggestion
                </h1>
            </div>
            <Box sx={{ width: 'auto' }}>
                <Stack spacing={2}
                    alignItems="center"
                    direction="column"
                    justifyContent="flex-end"
                >
                    {foodData.map((food) => (
                        <Item key={food.name} sx={{ width: '100%' }}>
                            <div className={styles.listContainer} >
                                <div className={styles.Left}>
                                    <Image src={food.src} width={100} height={100} alt={food.name} />
                                </div>
                                <div className={styles.Center}>
                                    <Typography className={styles.foodName}
                                        textAlign="start"
                                        variant="body1"
                                        component="p"
                                        alignItems={'left'}
                                        gutterBottom>{food.name}
                                    </Typography>
                                    <Typography className={styles.foodEnergy}
                                        textAlign="start"
                                        variant="body2"
                                        component="p"
                                        alignItems={'left'}
                                        gutterBottom>{"energy : " + food.energy + " kcal"}
                                    </Typography>
                                </div>
                                <div className={styles.Right}>
                                    <Button variant="contained">แดกแล้ว</Button>
                                </div>
                            </div>
                        </Item>
                    ))}
                </Stack>
            </Box>
            <Box sx={{ pb: 7 }}>
                <CssBaseline />
                <Paper sx={{ position: 'fixed', bottom: 70, left: 8, right: 8 }} elevation={3}>
                    <Autocomplete
                        freeSolo
                        options={foodData.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="กินอะไรดี? : แตะเพื่อค้นหาเมนูกว่า 200 เมนู" />}
                    />
                </Paper>
            </Box>
        </div>
    );
}
const foodData = [
    {
        src: '/Salad_platter.jpg',
        name: "Salad",
        energy: "80",
        type: ["appetizer", "vegetarian", "vegan"],
        ingredient: ["lettuce", "tomato", "cucumber", "onion", "carrot", "chicken", "egg", "cheese", "dressing"],
    },
    {
        src: '/Salad_platter.jpg',
        name: "Spaghetti Carbonara",
        energy: "680",
        type: ["main course", "chese", "pasta"],
        ingredient: ["pasta", "bacon", "egg", "cheese", "cream"],
    },
    {
        src: '/Salad_platter.jpg',
        name: "Banana",
        energy: "100",
        type: ["dessert", "fruit"],
        ingredient: ["banana"],
    },
    {
        src: '/Salad_platter.jpg',
        name: "Pancake",
        energy: "300",
        type: ["dessert", "breakfast"],
        ingredient: ["flour", "egg", "milk", "butter", "sugar"],
    },
    {
        src: '/Salad_platter.jpg',
        name: "Meat Steak",
        energy: "500",
        type: ["main course", "meat"],
        ingredient: ["beef", "salt", "pepper", "oil"],
    },
    {
        src: '/Salad_platter.jpg',
        name: "Chicken Steak",
        energy: "400",
        type: ["main course", "meat"],
        ingredient: ["chicken", "salt", "pepper", "oil"],
    },

]
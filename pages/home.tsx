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
import SaladPic from '/img/Salad_platter.jpg'
import Button from '@mui/material/Button';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicStack() {
    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.title}>
                    Suggestion
                </h1>
            </div>
            <Box sx={{ width: 'auto' }}>
                <Stack spacing={2}
                    alignItems="center"
                    direction="column"
                    justifyContent="flex-start"
                    >
                    {foodData.map((food) => (
                        <Item key = {food.name}>
                            <div className={styles.listContainer} >
                                <div className={styles.Left}>
                                    <Image src={food.src} />
                                </div>
                                <div className={styles.Right}>
                                    <Typography className={styles.foodName}
                                        variant="body1"
                                        component="p"
                                        alignItems={'left'}
                                        gutterBottom>{food.name}
                                    </Typography>
                                    <Typography className={styles.foodEnergy}
                                        variant="body2"
                                        component="p"
                                        alignItems={'left'}
                                        gutterBottom>{"energy : " + food.energy + " kcal"}
                                    </Typography>
                                    <Button variant="contained">Details</Button>
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
        src: SaladPic,
        name: "Salad",
        energy: "80",
        type: ["appetizer", "vegetarian", "vegan"],
        ingredient: ["lettuce", "tomato", "cucumber", "onion", "carrot", "chicken", "egg", "cheese", "dressing"],
    },
    {
        src: SaladPic,
        name: "Spaghetti Carbonara",
        energy: "680",
        type: ["main course", "chese", "pasta"],
        ingredient: ["pasta", "bacon", "egg", "cheese", "cream"],
    },
    {
        src: SaladPic,
        name: "Banana",
        energy: "100",
        type: ["dessert", "fruit"],
        ingredient: ["banana"],
    },
    {
        src: SaladPic,
        name: "Pancake",
        energy: "300",
        type: ["dessert", "breakfast"],
        ingredient: ["flour", "egg", "milk", "butter", "sugar"],
    },
    {
        src: SaladPic,
        name: "Meat Steak",
        energy: "500",
        type: ["main course", "meat"],
        ingredient: ["beef", "salt", "pepper", "oil"],
    },
    {
        src: SaladPic,
        name: "Chicken Steak",
        energy: "400",
        type: ["main course", "meat"],
        ingredient: ["chicken", "salt", "pepper", "oil"],
    },

]
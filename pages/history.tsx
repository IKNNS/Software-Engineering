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
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Opacity } from '@mui/icons-material';


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
                    History
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
                            <div>
                                <Typography
                                    textAlign="start"
                                    variant="body1"
                                    component="p"
                                    alignItems={'left'}
                                    gutterBottom>{"Today"}
                                </Typography>
                            </div>
                            <Accordion>
                                <AccordionSummary>
                                    <div className={styles.listContainer} >
                                        <div className={styles.Left}>
                                            <Image src={food.src} width={100} height={100} />
                                        </div>
                                        <div className={styles.Center}>
                                            <Typography className={styles.foodName}
                                                textAlign="start"
                                                variant="body1"
                                                component="p"
                                                alignItems={'left'}
                                                gutterBottom>{"พลังงานที่ได้รับ"}
                                            </Typography>
                                            <Typography className={styles.foodEnergy}
                                                textAlign="start"
                                                variant="body2"
                                                component="p"
                                                alignItems={'left'}
                                                gutterBottom>{food.energy + "kcal"}
                                            </Typography>
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={2}
                                        alignItems="center"
                                        direction="column"
                                        justifyContent="flex-end"
                                    >
                                        {foodData.map((food) => (
                                            <Item key={food.name} sx={{ width: '100%' }}>
                                                <div className={styles.listContainer} >
                                                    <div className={styles.Left}>
                                                        <Image src={food.src} width={100} height={100} />
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
                                                        <Button variant="contained">เพิ่ม</Button>
                                                    </div>
                                                </div>
                                            </Item>
                                        ))}
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
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
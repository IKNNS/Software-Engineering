import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import styles from '../styles/Home.module.css'
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import SaladPic from '/img/Salad_platter.jpg'

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
                <Typography variant="h4" gutterBottom>
                    Suggestion
                </Typography>
            </div>
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}
                    alignItems="center"
                    direction="column"
                    justifyContent="flex-start">
                    <Item>
                        <Image src={SaladPic} alt="Picture of the author" width={60} height={60} />
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"Salad"}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"energy : 80 kcal"}
                        </Typography>
                    </Item>
                    <Item>
                        <Image src={SaladPic} alt="Picture of the author" width={60} height={60} />
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"Salad"}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"energy : 80 kcal"}
                        </Typography>
                    </Item>
                    <Item>
                        <Image src={SaladPic} alt="Picture of the author" width={60} height={60} />
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"Salad"}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"energy : 80 kcal"}
                        </Typography>
                    </Item>
                    <Item>
                        <Image src={SaladPic} alt="Picture of the author" width={60} height={60} />
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"Salad"}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"energy : 80 kcal"}
                        </Typography>
                    </Item>
                    <Item>
                        <Image src={SaladPic} alt="Picture of the author" width={60} height={60} />
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"Salad"}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"energy : 80 kcal"}
                        </Typography>
                    </Item>
                    <Item>
                        <Image src={SaladPic} alt="Picture of the author" width={60} height={60} />
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"Salad"}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"energy : 80 kcal"}
                        </Typography>
                    </Item>
                    <Item>
                        <Image src={SaladPic} alt="Picture of the author" width={60} height={60} />
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"Salad"}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom>{"energy : 80 kcal"}
                        </Typography>
                    </Item>
                </Stack>
            </Box>
        </div>
    );
}

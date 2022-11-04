import {
    Autocomplete,
    Box,
    Button,
    ImageListItem,
    Stack,
    TextField,
    Typography,
    Container
} from "@mui/material";
import React from "react";
import type { NextPage } from 'next'
const Home: NextPage = () => {
    return (
        <Container>
            <div>
                <Stack alignItems="center">
                    <Typography sx={{ m: 4, color: "white" }} variant="h3">สมัครสมาชิค</Typography>
                </Stack>
                <div className="box">
                    <Stack sx={{ m: 2 }} spacing={3}>
                        <TextField id="outlined-basic" label="ชื่อ" variant="outlined" />
                        <TextField id="outlined-basic" label="นามสกุล" variant="outlined" />
                        <TextField id="outlined-basic" label="อีเมล์" variant="outlined" />
                        <TextField id="outlined-basic" label="รหัสผ่าน" variant="outlined" />
                        <TextField id="outlined-basic" label="ยืนยันรหัสผ่าน" variant="outlined" />
                    </Stack>
                    <Stack sx={{ width: "100%" }} justifyContent="flex-end" direction="row" spacing={2} >
                        <Button variant="contained" color="success">ยืนยัน</Button>
                        <Button variant="contained" color="warning">ยกเลิก</Button>
                    </Stack>
                </div>
            </div>
        </Container>
    )
}
export default Home
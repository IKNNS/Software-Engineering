import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Image from 'next/image'
import styles2 from '@styles/box.module.css'
import pic from '@styles/pic.module.css'
import { ChangeEventHandler, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
import { stat } from 'fs';
function showtext(text: string | null) {
    return (text != null ? text : 'NULL');
}
export default function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [editstate, setEditstate] = React.useState<boolean>(true);
    function showtext(text: string | null) {
        return (text != null ? text : 'NULL');
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const toggleClick=()=>{
        setEditstate(!editstate);
    }
    function SaveEdit(){
        return(editstate? 'แก้ไข':'บันทึก');
    }
    const list = (anchor) => (
        <Container>
            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
                /*onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}*/
            >
                <div className={styles2.center}>
                    <Image src={'/fuang.jpg'} className={pic.round} width={150} height={150} alt='image' />
                    <h1 className={styles2.cutspace}>{showtext('Kong')}</h1>
                </div>
                <Stack sx={{ marginTop: 1, marginBottom: 1 }} fontSize={20}>
                    ประเภทอาหาร:
                </Stack>
                <Autocomplete
                    multiple
                    id="tags-readOnly"
                    options={UserFood.typeOfFood}
                    defaultValue={[UserFood.typeOfFood[0]]}
                    filterSelectedOptions={!editstate}
                    readOnly={editstate}
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                    className={styles2.box3}
                    sx={{ width: "100%", marginBottom: 1 }}
                />
                <Stack sx={{ marginTop: 1, marginBottom: 1 }} fontSize={20}>
                    รูปแบบการกิน:
                </Stack>
                <Autocomplete
                    multiple
                    id="tags-readOnly"
                    options={UserFood.typeOfFood}
                    defaultValue={[UserFood.typeOfFood[0]]}
                    filterSelectedOptions={!editstate}
                    readOnly={editstate}
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                    className={styles2.box3}
                    sx={{ width: "100%", marginBottom: 1 }}
                />
                <Stack sx={{ marginTop: 1, marginBottom: 1 }} fontSize={20}>
                    พลังงาน:
                </Stack>
                <TextField
                    sx={{ width: "100%" }}
                    className={styles2.box3}
                    defaultValue={100}
                    InputProps={{
                        readOnly: editstate,
                      }}
                ></TextField>
                <Stack sx={{ marginTop: 1, marginBottom: 1 }} fontSize={20}>
                    เวลาที่รับประทาน:
                </Stack>
                <TextField
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    sx={{ width: "100%", marginBottom: 1 }}
                    InputProps={{
                        readOnly: editstate,
                      }}
                    className={styles2.box3}
                />
                <Stack sx={{ width: "100%", marginTop: 2, marginBottom: 2 }} justifyContent="outlined" >
                    <Button onClick={toggleClick}variant="contained" color="success"> {SaveEdit()} </Button>
                </Stack>
            </Box>
        </Container>
    );

    return (
        <div>
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>details</Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                        PaperProps={{ elevation: 0, style: { borderTopLeftRadius: "15px", borderTopRightRadius: "15px" } }}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
const UserFood =
{
    ID: "No One",
    typeOfFood: ['อาหารทั่วไป','มังสวิรัติ',],
    disease: ["โรคไต", "โรคเบาหวาน",],
    allergy: ["กุ้ง", "ปู",],
    avoid: ["ไข่", "นม",],
};
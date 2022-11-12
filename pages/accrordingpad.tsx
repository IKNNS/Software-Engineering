import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Image from 'next/image'
import styles2 from '../styles/box.module.css'
import pic from '../styles/pic.module.css'
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";



export default function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
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

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className={styles2.center}>
                <Image src={'/fuang.jpg'} className={pic.round} width={150} height={150} alt='image' />
                <h1 className={styles2.cutspace}>{showtext('Kong')}</h1>
            </div>
            <div>
                    ประเภทอาหาร:
                </div>
                <Autocomplete
                    multiple
                    id="tags-readOnly"
                    options={[UserFood.typeOfFood.map((foodType) => foodType)]}
                    defaultValue={[UserFood.typeOfFood.map((foodType) => foodType)]}
                    readOnly
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                    disabled={true}
                    className={styles2.box3}
                />
            <div>
                รูปแบบการกิน:
            </div>
            <Autocomplete
                multiple
                id="tags-readOnly"
                options={[UserFood.typeOfFood.map((foodType) => foodType)]}
                defaultValue={[UserFood.typeOfFood.map((foodType) => foodType)]}
                readOnly
                renderInput={(params) => (
                    <TextField {...params} />
                )}
                disabled={true}
                className={styles2.box3}
            />
        </Box>
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
    typeOfFood: ['อาหารทั่วไป',],
    disease: ["โรคไต", "โรคเบาหวาน",],
    allergy: ["กุ้ง", "ปู",],
    avoid: ["ไข่", "นม",],
};
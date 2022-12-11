import { PageStart } from "components/common/Page"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    List,
    ListItem,
    Typography,
} from "@mui/material";

import { NextPage } from "next"
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@libs/firebase/useAuth";
import { INotification } from "@models/Noti_Model";

const Notification: NextPage = () => {

    const [noti, setNoti] = useState<INotification[]>([])
    const [user] = useAuth()

    useEffect(() => {
        if (!user?.uid) return;

        axios.get('http://139.59.105.124/noti/' + user.uid)
            .then(res => res.data as INotification[])
            .then(data => {
                console.log(data);
                setNoti(data)
            })
            .catch(e => setNoti([]))

        console.log(noti);
    }, [user])

    return (
        <PageStart className="p-4 gap-5">
            <div className="text-center">
                <h2>Notification</h2>
            </div>
            <List className="flex w-full flex-col gap-3">
                {noti.map((value, i) => (
                    <ListItem key={i}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                alt={value.head}
                                height="140"
                                image= {value.imgUrl}
                                />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {value.head}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {value.text}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" href = {value.URL}>เพิ่มเติม</Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </PageStart>
    );
};

export default Notification

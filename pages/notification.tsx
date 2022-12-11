import { PageStart } from "components/common/Page"
import { Button, Card, CardActions, CardContent, CardMedia, List, ListItem, Typography } from "@mui/material";
import { NextPage } from "next"
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@libs/firebase/useAuth";
import { INotification } from "@models/Noti_Model";
import { AlignHorizontalCenter } from "@mui/icons-material";

const Notification: NextPage = () => {

    const [noti, setNoti] = useState<INotification[]>([])
    const [user] = useAuth()

    useEffect(() => {
        if (!user?.uid) return;

        axios.get("/api/" + user.uid)
            .then(res => res.data as INotification[])
            .then(data => {
                console.log(data);
                setNoti(data)
            })
            .catch(e => setNoti([]))

        console.log(noti);
    }, [user])

    return (
        <PageStart className="p-4 gap-5 pt-10 pb-10">
            <div className="text-center">
                <h1>Notification</h1>
            </div>
            <List className="flex w-full flex-col justify-start items-center gap-3 pb-14">
                {noti.map((value, i) => (
                    <ListItem key={i}>
                        <Card sx={{ maxWidth: 345, mx: 'auto'}}>
                            <CardMedia
                                component="img"
                                alt={value.head}
                                height="140"
                                image={value.imgUrl}
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
                                <Button size="small" href={value.URL}>เพิ่มเติม</Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </PageStart>
    );
};

export default Notification

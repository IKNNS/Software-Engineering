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
import { INotification } from "@models/Noti_Module";

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

const notiFromServer = [
    {
        imgUrl: "https://www.shutterstock.com/image-vector/clock-icon-design-vector-office-260nw-411448378.jpg",
        head: "วันนี้คุณยังไม่ได้ทานมือเที่ยง?",
        text: "เลยเวลาอาหารเที่ยงแล้วนะ! ถ้าลืมเพิ่มก็เพิ่มได้เลย! แต่ถ้ายังไม่ทานระวังโรคกรดไหลย้อนล่ะะ",
        URL: "https://www.rama.mahidol.ac.th/ramachannel/infographic/%e0%b9%84%e0%b8%a1%e0%b9%88%e0%b8%ad%e0%b8%a2%e0%b8%b2%e0%b8%81%e0%b9%80%e0%b8%9b%e0%b9%87%e0%b8%99%e0%b9%82%e0%b8%a3%e0%b8%84%e0%b8%81%e0%b8%a3%e0%b8%94%e0%b9%84%e0%b8%ab%e0%b8%a5%e0%b8%a2%e0%b9%89/"
    },
    {
        imgUrl: "https://img.freepik.com/free-vector/food-allergy-abstract-concept-vector-illustration-food-ingredient-intolerance-allergy-treatment-allergen-identification-risk-factor-skin-rash-problem-gluten-free-diet-abstract-metaphor_335657-1555.jpg?w=2000",
        head: "คุณทานอาหารที่แพ้!",
        text: "แย่แล้วว บันทึกของคุณมีอาหารที่แพ้! คือ น้ำตาลทราย,ใบมะกรูด,ไข่ไก่,น้ำมันพืช ระวังเมนูอาหารด้วยนะ สอบถามร้านค้าเรื่องส่วนผสมให้มั่นใจว่าคุณสามารถทานได้ หรืออ่านวิธีปฎิบัติด้านล่าง",
        URL: "https://www.rama.mahidol.ac.th/ramachannel/gallery/%E0%B9%81%E0%B8%9E%E0%B9%89%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3/"
    },
    {
        imgUrl: "https://tuemaster.com/wp-content/uploads/2021/02/thequint-1200x600.jpg",
        head: "คุณทานอาหารน้อยอยู่นะะ!",
        text: "ตอนนี้คุณทานอาหารไป 558 kcals เหลืออีก 1248.25 kcals ตามการคำนวน BMR อย่าลืมทานให้เพียงพอละะ",
        URL: "https://eatwellconcept.com/2021/11/23/basic_nutrition_energy_intake/"
    },
    {
        imgUrl: "https://www.shutterstock.com/image-photo/heart-shaped-pizza-served-on-260nw-331729097.jpg",
        head: "คุณได้ทานประเภทอาหารที่ชอบด้วย!",
        text: "ดีจัง วันนี้คุณได้ทาน ของคาว ด้วย ขอให้สนุกกับประเภทอาหารที่ชอบนะ",
        URL: ""
    }
]
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

<<<<<<< HEAD
export default Notification

const notiFromServer = [
    {
        imgUrl : "https://img.freepik.com/premium-vector/alarm-clock-icon-alarm-clock-that-sounds-loudly-morning-wake-up-from-bed_68708-698.jpg?w=2000",
        head : "วันนี้คุณยังไม่ได้ทานมือเช้า?",
        text : "เช้าแล้วนะ! ถ้ายังไม่เพิ่มก็เพิ่มได้เลย อาหารเช้าสำคัญอย่าลืมกินอาหารเช้าด้วยล่ะ!",
        URL : "https://www.samitivejhospitals.com/th/article/detail/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%8A%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AA%E0%B8%B3%E0%B8%84%E0%B8%B1%E0%B8%8D"
    },
    {
        imgUrl : "https://img.freepik.com/premium-vector/alarm-clock-icon-vector-graphics_292645-285.jpg?w=2000 ",
        head : "วันนี้คุณยังไม่ได้ทานมือเที่ยง?",
        text : "เลยเวลาอาหารเที่ยงแล้วนะ! ถ้าลืมเพิ่มก็เพิ่มได้เลย! แต่ถ้ายังไม่ทานระวังโรคกรดไหลย้อนล่ะะ",
        URL : "https://www.rama.mahidol.ac.th/ramachannel/infographic/%e0%b9%84%e0%b8%a1%e0%b9%88%e0%b8%ad%e0%b8%a2%e0%b8%b2%e0%b8%81%e0%b9%80%e0%b8%9b%e0%b9%87%e0%b8%99%e0%b9%82%e0%b8%a3%e0%b8%84%e0%b8%81%e0%b8%a3%e0%b8%94%e0%b9%84%e0%b8%ab%e0%b8%a5%e0%b8%a2%e0%b9%89/"
    },
    {
        imgUrl : "https://img.freepik.com/premium-vector/alarm-clock-flat-icon-wake-up-time-ringing-alarm-clock-morning-time-vector-illustration_349999-442.jpg?w=2000",
        head : "วันนี้คุณยังไม่ได้ทานมือเย็น?",
        text : "ถึงเวลาอาหารเย็นแล้วนะ! ถ้าลืมเพิ่มก็เพิ่มได้เลย! ระวังอย่ากินมื้อเย็นเยอะเกินไปล่ะ",
        URL : "https://www.bangkokhospital.com/content/the-health-effects-of-overweight-and-obesity"
    },
    
    {
        imgUrl : "https://img.freepik.com/free-vector/food-allergy-abstract-concept-vector-illustration-food-ingredient-intolerance-allergy-treatment-allergen-identification-risk-factor-skin-rash-problem-gluten-free-diet-abstract-metaphor_335657-1555.jpg?w=2000",
        head : "คุณทานอาหารที่แพ้!",
        text : "แย่แล้วว บันทึกของคุณมีอาหารที่แพ้! คือ น้ำตาลทราย,ใบมะกรูด,ไข่ไก่,น้ำมันพืช ระวังเมนูอาหารด้วยนะ สอบถามร้านค้าเรื่องส่วนผสมให้มั่นใจว่าคุณสามารถทานได้ หรืออ่านวิธีปฎิบัติด้านล่าง",
        URL : "https://www.rama.mahidol.ac.th/ramachannel/gallery/%E0%B9%81%E0%B8%9E%E0%B9%89%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3/"
    },
    {
        imgUrl : "https://img.freepik.com/premium-vector/stop-fast-food-junk-snacks-vector-concept_53562-3338.jpg?w=2000",
        head : "คุณทานอาหารที่หลีกเลี่ยง!",
        text : "แย่แล้วว บันทึกของคุณมีอาหารที่หลีกเลี่ยงอยู่ มันอาจจะเป็นวัตถุดิบที่คุณไม่ชอบทานหรือคุณอาจจะเสี่ยงเป็นโรคต่างๆได้ สอบถามร้านค้าเรื่องส่วนผสมให้มั่นใจว่าคุณสามารถทานได้ หรืออ่านวิธีปฎิบัติด้านล่าง",
        URL : "https://www.rama.mahidol.ac.th/ramachannel/gallery/%E0%B9%81%E0%B8%9E%E0%B9%89%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3/"
    },
    {
        imgUrl : "https://tuemaster.com/wp-content/uploads/2021/02/thequint-1200x600.jpg",
        head : "คุณทานอาหารน้อยอยู่นะะ!",
        text : "ตอนนี้คุณทานอาหารไป 558 kcals เหลืออีก 1248.25 kcals ตามการคำนวน BMR อย่าลืมทานให้เพียงพอละะ",
        URL : "https://eatwellconcept.com/2021/11/23/basic_nutrition_energy_intake/"
    },
    {
        imgUrl : "https://img.freepik.com/free-vector/illustration-hands-holding-junk-food_53876-26715.jpg?w=2000",
        head : "วันนี้คุณทานอาหารอะไรไปบ้างแล้ว?",
        text : "วันนี้คุณทานอาหารไปครบ 3 มื้อแล้ว พลังงานรวมที่คุณทานไปทั้งหมด 1378 kcals ถือว่ากำลังดีเลยแหละ",
        URL : "https://eatwellconcept.com/2021/11/23/basic_nutrition_energy_intake/"
    },
    {
        imgUrl : "https://thumbs.dreamstime.com/z/healthy-food-your-heart-infographic-concept-food-vitamins-medicine-heart-disease-prevention-vector-healthy-food-203560574.jpg",
        head : "ตอนนี้คุณมีโรคประจำตัวหรือป่าวนะ?",
        text : "ตอนนี้คุณเป็นโรค เบาหวาน ซึ่งเป็นโรคที่เกิดจากความผิดปกติของตับอ่อนซึ่งไม่สามารถหลั่งอินซูลิน เพื่อรักษาระดับน้ำตาลในเลือดได้ ควรหลีกเลี่ยง อาหารที่มีรสหวาน เช่น น้ำตาล น้ำตาล ไข่ เนยสด มาการีน กะทิ สอบถามร้านค้าเรื่องส่วนผสมให้มั่นใจว่าคุณสามารถทานได้หรืออ่าน วิธีปฎิบัติด้านล่าง",
        URL : "https://www.phyathai.com/article_detail/3699/th/%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%83%E0%B8%8A%E0%B9%88_%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B9%80%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%B0%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%84%E0%B8%99%E0%B9%84%E0%B8%82%E0%B9%89%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B9%80%E0%B8%9A%E0%B8%B2%E0%B8%AB%E0%B8%A7%E0%B8%B2%E0%B8%99?branch=PYTN"
    },
    {
        imgUrl : "https://www.shutterstock.com/image-photo/heart-shaped-pizza-served-on-260nw-331729097.jpg",
        head : "คุณได้ทานประเภทอาหารที่ชอบด้วย!",
        text : "ดีจัง วันนี้คุณได้ทาน ของคาว ด้วย ขอให้สนุกกับประเภทอาหารที่ชอบนะ",
        URL : ""
    }
]
=======
export default Notification
>>>>>>> 21b9baafa275930a7faaf3fa155c44a3304c3317

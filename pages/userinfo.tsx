import type { NextPage } from 'next'
import Image from 'next/image'
import styles2 from '../styles/box.module.css'
import pic from '../styles/pic.module.css'
import position from '../styles/position.module.css'
import profilePic from '../img/62649345_1245721135605302_8922629952818380800_n.jpg'
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { initFirebase } from '../firebase/FirebaseApp';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';


function showtext(text: string | null) {
    return (text != null ? text : 'NULL');
}

const Account: NextPage = () => {
    let name, w, hi, gender, age: any;
    initFirebase();
    const auth = getAuth();
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>loading...</div>
    }
    if (!user) {
        router.push('/login')
        return <div>Please sign in to continue</div>
    }

    return (
        <div className={styles2.cutspace}>
            <p className={styles2.blank}></p>
            <div>
                <IconButton href="https://www.google.com/" className={position.topleft}> <SettingsIcon sx={{ fontSize: 40 }} /></IconButton>
                <IconButton onClick={() => auth.signOut()} className={position.topright}><LogoutIcon sx={{ fontSize: 40 }} /></IconButton>
            </div>
            <div className={styles2.center}>
                <div className={styles2.center}>
                    <Image src={profilePic} className={pic.round} width={150} height={150} alt='image' />
                    <h1 className={styles2.cutspace}>{showtext(Userinfo.ID)}</h1>
                </div>
                <div className={styles2.box}>
                    <div>
                        ข้อมูลส่วนตัว
                        <div>
                            ชื่อผู้ใช้งาน:
                        </div>
                        <div className={styles2.box2}>
                            {showtext(Userinfo.name)}
                        </div>
                        <p className={styles2.blank}></p>
                        <p className={styles2.blank}></p>
                        <div>
                            อายุ:
                            <label className={styles2.code}>{showtext(Userinfo.age)}</label>
                            เพศ:
                            <label className={styles2.code}>{showtext(Userinfo.gender)}</label>
                        </div>
                        <p className={styles2.blank}></p>
                        <p className={styles2.blank}></p>
                        <p className={styles2.blank}></p>
                        <p className={styles2.blank}></p>
                        <div>
                            น้ำหนัก:
                            <label className={styles2.code}>{showtext(Userinfo.w)}</label>
                            ส่วนสูง:
                            <label className={styles2.code}>{showtext(Userinfo.hi)}</label>
                        </div>
                        <p className={styles2.blank}></p>
                        <div>
                            รูปแบบการกิน:
                        </div>
                        <Autocomplete
                            multiple
                            id="tags-readOnly"
                            options= {[UserFood.typeOfFood]}
                            defaultValue={[UserFood.typeOfFood]}
                            readOnly
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                            disabled={true}
                            className={styles2.box3}
                        />
                        <div>
                            โรคประจำตัว:
                        </div>
                        <Autocomplete
                            multiple
                            id="tags-readOnly"
                            options={[UserFood.disease]}
                            defaultValue={[UserFood.disease]}
                            readOnly
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                            disabled={true}
                            className={styles2.box3}
                        />
                        <div>
                            อาหารที่แพ้:
                        </div>
                        <Autocomplete
                            multiple
                            id="tags-readOnly"
                            options={[UserFood.allergy]}
                            defaultValue={[UserFood.allergy]}
                            readOnly
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                            disabled={true}
                            className={styles2.box3}
                        />
                        <div>
                            สิ่งที่หลีกเลี่ยง:
                        </div>
                        <Autocomplete
                            multiple
                            id="tags-readOnly"
                            options={[UserFood.avoid]}
                            defaultValue={[UserFood.avoid]}
                            readOnly
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                            disabled={true}
                            className={styles2.box3}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Account

const UserFood =
{
    ID: "No One",
    typeOfFood: ['อาหารทั่วไป',],
    disease: ["โรคไต", "โรคเบาหวาน",],
    allergy: ["กุ้ง", "ปู",],
    avoid: ["ไข่", "นม",],
};

const Userinfo = {
    ID: "No One",
    name: "John Doe",
    w: "50",
    hi: "170",
    gender: "male",
    age: "25",
};
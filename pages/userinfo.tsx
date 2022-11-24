import type { NextPage } from 'next'
import Image from 'next/image'
import styles2 from '../styles/box.module.css'
import pic from '../styles/pic.module.css'
import position from '../styles/position.module.css'
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuth } from '@libs/firebase/useAuth'
import Loading from 'components/common/loading'
import { UserAccount, UserInfo } from '@models/User_Model'
import { GetUserAccount } from '@libs/firebase/userData'
import { Chip, Paper } from '@mui/material'
import Button from '@mui/material/Button'
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import Woman2OutlinedIcon from '@mui/icons-material/Woman2Outlined';
import SettingsAccessibilityOutlinedIcon from '@mui/icons-material/SettingsAccessibilityOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import DoNotDisturbRoundedIcon from '@mui/icons-material/DoNotDisturbRounded';
import NoMealsOutlinedIcon from '@mui/icons-material/NoMealsOutlined';

function gender(text: string | undefined) {
    if (text && text == 'male')
        return "ชาย"
    else if (text && text == "female")
        return "หญิง"
    else
        return "ไม่ระบุ"
}

const auth = getAuth();

const Account: NextPage = () => {

    const router = useRouter();
    const [user, loading] = useAuth(auth);

    const [open, setOpen] = useState({
        disease: false,
        type: false,
        allergy: false,
        avoid: false,
    })

    const [userData, setUserData] = useState<UserAccount>()

    const loadData = async () => {
        if (!user) return;
        const res = await GetUserAccount(user.uid);
        console.log(res.data());
        if (res.data()) {
            setUserData(res.data() as UserAccount);
        }
    }

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
            return;
        }
        loadData();
    }, [user, loading])

    return (
        <div className={`w-screen h-screen flex flex-col`}>
            {(loading) && <Loading screen />}
            <div className='relative w-full flex flex-col justify-start items-center gap-5 p-3 bg-second top-[120px] rounded-3xl'>
                <div className='absolute -top-[60px] w-[120px] h-[120px] rounded-full border-8 border-solid border-second overflow-hidden'>
                    <Image src='/fuang.jpg' alt="profile" width={120} height={120} />
                </div>
                <div className='mt-[60px] text-2xl uppercase font-medium'>{userData?.firstname}</div>
                <div className='font-light text-sm uppercase'>{userData?.email}</div>
                <Button variant="contained" sx={{ 'fontWeight': 300, 'borderRadius': '20px' }}>Edit Profile</Button>
                <div className='py-3 gap-3 flex flex-col bg-white w-full rounded-3xl shadow-lg border border-neutral-200 border-solid overflow-hidden'>
                    <div className='w-full text-center text-base'>
                        ประวัติส่วนตัว
                    </div>
                    <div className='w-full h-[1px] bg-neutral-300'></div>
                    <div className='px-5 w-full flex flex-row items-center justify-start gap-3'>
                        <BadgeOutlinedIcon sx={{ 'fontSize': 36 }} className="text-main" />
                        {userData?.firstname} {userData?.lastname}
                    </div>
                    <div className='px-5 w-full flex flex-row items-center justify-start gap-3'>
                        {(userData?.info?.gender == "female") ?
                            <Woman2OutlinedIcon sx={{ 'fontSize': 36, color: '#ffc2f8' }} /> :
                            <ManOutlinedIcon color='primary' sx={{ 'fontSize': 36 }} />}
                        เพศ : {gender(userData?.info?.gender)}
                    </div>
                    <div className='px-5 w-full flex flex-row items-center justify-start gap-3'>
                        <SettingsAccessibilityOutlinedIcon sx={{ 'fontSize': 36 }} className="text-main" />
                        ส่วนสูง : {userData?.info?.height} / น้ำหนัก : {userData?.info?.weight}
                    </div>
                    <div className='px-5 w-full flex flex-row items-center justify-start gap-3' onClick={() => setOpen({ ...open, disease: !open.disease })}>
                        <LocalHospitalOutlinedIcon sx={{ 'fontSize': 36 }} className="text-main" />
                        โรคประจำตัว
                        <KeyboardArrowRightRoundedIcon sx={{ 'fontSize': 36 }} className={`ml-auto transition-all ${!open.disease ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    <div className={`transition-all px-5 w-full flex flex-row
                    items-center justify-start gap-3 overflow-hidden
                    ${!open.disease ? 'max-h-[0px]' : 'max-h-[500px]'}`}>
                        {
                            userData?.food?.disease?.map((v, i) => <Chip key={i} label={v} className={'px-3'} />)
                        }
                    </div>
                </div>
                <div className='mb-[100px] py-3 gap-3 flex flex-col bg-white w-full rounded-3xl shadow-lg border border-neutral-200 border-solid overflow-hidden'>
                    <div className='w-full text-center text-base'>
                        ข้อมูลการรับประทานอาหาร
                    </div>
                    <div className='w-full h-[1px] bg-neutral-300'></div>
                    <div className='px-5 w-full flex flex-row items-center justify-start gap-3' onClick={() => setOpen({ ...open, type: !open.type })}>
                        <LocalDiningOutlinedIcon sx={{ 'fontSize': 36 }} className="text-main" />
                        ประเภทอาหารที่ทาน
                        <KeyboardArrowRightRoundedIcon sx={{ 'fontSize': 36 }} className={`ml-auto transition-all ${!open.type ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    <div className={`transition-all px-5 w-full flex flex-row
                    items-center justify-start gap-3 overflow-hidden
                    ${!open.type ? 'max-h-[0px]' : 'max-h-[500px]'}`}>
                        {
                            userData?.food?.eatingType?.map((v, i) => <Chip key={i} label={v} className={'px-3'} />)
                        }
                    </div>
                    <div className='px-5 w-full flex flex-row items-center justify-start gap-3' onClick={() => setOpen({ ...open, allergy: !open.allergy })}>
                        <DoNotDisturbRoundedIcon sx={{ 'fontSize': 36 }} className="text-main" />
                        วัตถุดิบที่แพ้
                        <KeyboardArrowRightRoundedIcon sx={{ 'fontSize': 36 }} className={`ml-auto transition-all ${!open.allergy ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    <div className={`transition-all px-5 w-full flex flex-row
                    items-center justify-start gap-3 overflow-hidden
                    ${!open.allergy ? 'max-h-[0px]' : 'max-h-[500px]'}`}>
                        {
                            userData?.food?.allergy?.map((v, i) => <Chip key={i} label={v} className={'px-3'} />)
                        }
                    </div>
                    <div className='px-5 w-full flex flex-row items-center justify-start gap-3' onClick={() => setOpen({ ...open, avoid: !open.avoid })}>
                        <NoMealsOutlinedIcon sx={{ 'fontSize': 36 }} className="text-main" />
                        วัตถุดิบที่หลีกเลี่ยง
                        <KeyboardArrowRightRoundedIcon sx={{ 'fontSize': 36 }} className={`ml-auto transition-all ${!open.avoid ? 'rotate-0' : 'rotate-90'}`} />
                    </div>
                    <div className={`transition-all px-5 w-full flex flex-row
                    items-center justify-start gap-3 overflow-hidden
                    ${!open.avoid ? 'max-h-[0px]' : 'max-h-[500px]'}`}>
                        {
                            userData?.food?.avoid?.map((v, i) => <Chip key={i} label={v} className={'px-3'} />)
                        }
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
import { getAll, getIngredient, getTypes } from "@libs/database/food"
import { useAuth } from "@libs/firebase/useAuth"
import { Food } from "@models/Food_Model"
import { UserAccount, UserFood } from "@models/User_Model"
import { PageStart } from "@components/common/Page"
import Account from "@libs/database/user"
import User from "@assets/images/user.svg"

import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { ReactNode, useEffect, useMemo, useState } from "react"
import Image from 'next/image'

import EmailIcon from '@mui/icons-material/EmailOutlined';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import FoodIcon from '@mui/icons-material/RestaurantRounded';
import DiseaseIcon from '@mui/icons-material/LocalHospitalRounded';
import AllergyIcon from '@mui/icons-material/NoMealsRounded';
import FastfoodIcon from '@mui/icons-material/FastfoodRounded';
import ProfileIcon from '@mui/icons-material/PersonRounded';
import ArrowIcon from '@mui/icons-material/KeyboardArrowRightRounded';

import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Button, Drawer } from "@mui/material"
import EditForm from "@components/user-info/edit-form"
import { getAllDisease } from "@libs/database/disease"

interface IGender {
    name: string,
    icon: ReactNode
}

const genders: { [key: string]: IGender; } = {
    "female": {
        name: "หญิง",
        icon: <FemaleRoundedIcon sx={{ color: "#f06292" }} />
    },
    "male": {
        name: "ชาย",
        icon: <MaleRoundedIcon sx={{ color: "#3f51b5" }} />
    },
    "other": {
        name: "ไม่ระบุ",
        icon: <MoreHorizRoundedIcon sx={{ color: "#90969D" }} />
    }
}

const UserInfo: NextPage = () => {

    const [data, setData] = useState<UserAccount>()
    const [gender, setGender] = useState<IGender>()
    const [openDrawer, setOpenDrawer] = useState(false)

    const [types, setTypes] = useState<string[]>([]);
    const [ingredient, setIngredient] = useState<string[]>([]);
    const [disease, setDisease] = useState<string[]>([])

    const [listHead, setListHead] = useState("")
    const [defaultValue, setDefaultValue] = useState<string[]>([])
    const [dataList, setDataList] = useState<string[]>([])

    const [user] = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) return () => { }

        Account.get(user.uid)
            .then(res => res)
            .then(data => {
                if (data) {
                    setData(data)
                    setGender(genders[data?.info?.gender ?? "other"])
                }
            })
            .catch(e => console.log(e))


    }, [user])

    useEffect(() => {
        getTypes()
            .then(v => setTypes(v))
            .catch(e => console.log(e))

        getIngredient()
            .then(v => setIngredient(v))
            .catch(e => console.log(e))

        getAllDisease()
            .then(v => setDisease(v.map(d => d.name)))
            .catch(e => console.log(e));
    }, [])

    const handleSave = async (value: string[]) => {
        if (!user || !data) return;

        if (listHead == "โรคประจำตัว") {
            const info = data?.info;
            if (!info) return;
            info.disease = value;
            await Account.updateInfo(user.uid, info);
            setData({ ...data, info: info })
        } else {
            const food = data?.food;
            if (!food) return;
            switch (listHead) {
                case "ประเภทอาหารที่รับประทาน":
                    food.eatingType = value;
                    break;
                case "วัตถุดิบที่แพ้":
                    food.allergy = value;
                    break;
                case "วัตถุดิบที่หลีกเลี่ยง":
                    food.avoid = value;
                    break;
                default:
                    break;
            }
            await Account.updateFood(user.uid, food);
            setData({ ...data, food: food })
        }
        setOpenDrawer(false)
    }

    return (
        <PageStart className="p-4">
            <div className="w-full pb-14 flex flex-col justify-start items-center gap-3">
                <div className="text-center">
                    <h2>Profile</h2>
                </div>
                <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-action">
                    <Image src={User} width={50} height={50} alt="profile" color="#F1F6F7" />
                </div>
                <div className="text-center text-link">
                    Edit Image
                </div>
                <Block icon={<ProfileIcon color="secondary" />}
                    label="ชื่อ-นามสกุล"
                    value={data?.firstname + " " + data?.lastname}
                />
                <Block icon={<EmailIcon color="secondary" />}
                    label="อีเมล"
                    value={data?.email}
                />
                <Block icon={gender?.icon}
                    label="เพศ"
                    value={gender?.name}
                />
                <Block icon={<CakeRoundedIcon color="secondary" />}
                    label="อายุ"
                    value={data?.info?.age}
                />
                <Block icon={<DiseaseIcon color="secondary" />}
                    label=""
                    value={"โรคประจำตัว"}
                    onClick={() => {
                        setListHead("โรคประจำตัว")
                        setDefaultValue(data?.info?.disease ?? [])
                        setOpenDrawer(true)
                        setDataList(disease);
                    }}
                />
                <div className="text-center flex flex-row w-full justify-center items-center gap-2 my-3">
                    <div className="w-[30%] h-[1px] bg-secondary inline-flex" />
                    <p>ข้อมูลอาหาร</p>
                    <div className="w-[30%] h-[1px] bg-secondary inline-flex" />
                </div>
                <Block icon={<FoodIcon color="secondary" />}
                    label=""
                    value={"ประเภทอาหารที่รับประทาน"}
                    onClick={() => {
                        setListHead("ประเภทอาหารที่รับประทาน")
                        setDefaultValue(data?.food?.eatingType ?? [])
                        setOpenDrawer(true)
                        setDataList(types)
                    }}
                />
                <Block icon={<AllergyIcon color="secondary" />}
                    label=""
                    value={"วัตถุดิบที่แพ้"}
                    onClick={() => {
                        setListHead("วัตถุดิบที่แพ้")
                        setDefaultValue(data?.food?.allergy ?? [])
                        setOpenDrawer(true)
                        setDataList(ingredient)
                    }}
                />
                <Block icon={<FastfoodIcon color="secondary" />}
                    label=""
                    value={"วัตถุดิบที่หลีกเลี่ยง"}
                    onClick={() => {
                        setListHead("วัตถุดิบที่หลีกเลี่ยง")
                        setDefaultValue(data?.food?.avoid ?? [])
                        setOpenDrawer(true)
                        setDataList(ingredient)
                    }}
                />
                <Button variant="outlined" color="error" sx={{ px: 3 }} onClick={() => router.push("logout")}>
                    ออกจากระบบ
                </Button>
                <Drawer
                    anchor={'bottom'}
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    className="relative"
                >
                    <EditForm label={listHead}
                        value={defaultValue}
                        data={dataList}
                        onCancel={() => setOpenDrawer(false)}
                        onSave={handleSave}
                    />

                </Drawer>
            </div>
        </PageStart>
    )
}

export default UserInfo

interface DataProps {
    label: string,
    value?: any,
    icon: ReactNode,
    onClick?: () => void
}

const Block: React.FC<DataProps> = ({ icon, value, label, onClick }) => {

    return (
        <div className="bg-white w-full shadow-out rounded-xl p-3 flex flex-row justify-start items-center gap-3"
            onClick={onClick}
        >
            {icon}
            <div className="w-[1px] h-full bg-secondary rounded-lg" />
            <div className="flex flex-col">
                <p className="text-secondary text-xs">{label}</p>
                <p className="text-main">{value}</p>
            </div>
            {
                onClick &&
                <div className={`ml-auto transition-all duration-300 `}>
                    <ArrowIcon fontSize="large" color="action" />
                </div>
            }
        </div>
    )

}
import { addHistory, getAll } from "@libs/database/food"
import { useAuth } from "@libs/firebase/useAuth"
import { Food, FoodHistory } from "@models/Food_Module"
import { UserAccount, UserFood } from "@models/User_Model"
import { PageStart } from "components/common/Page"
import FoodItem from "components/home/FoodItem"
import Account from "@libs/database/user"

import {
    Autocomplete,
    Paper,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Drawer
} from "@mui/material"

import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import AddMenu from "components/home/AddMenu"

interface Warning {
    allergy: string[];
    avoid: string[];
}

const HomePage: NextPage = () => {

    const [userData, setUserData] = useState<UserAccount>()

    const [foodList, setFoodList] = useState<Food[]>([])
    const [openDialog, setOpenDialog] = useState(false);

    const [foodSelect, setFoodSelect] = useState<Food>();
    const [openMenu, setOpenMenu] = useState(false);

    const [warning, setWarning] = useState<Warning>({ allergy: [], avoid: [] });
    const [openWarning, setOpenWarning] = useState(false);

    const [user] = useAuth()
    const router = useRouter()

    useEffect(() => {
        getAll()
            .then(value => setFoodList(value))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (!user) return () => { }

        Account.get(user.uid)
            .then(res => res)
            .then(data => (!data.info) ? setOpenDialog(true) : setUserData(data))
            .catch(e => setOpenDialog(true))
    }, [user])

    const handelSelect = (index: number) => {
        setFoodSelect(foodList[index]);
        setOpenMenu(true);
    }

    const handelEat = () => {
        if (!foodSelect) return;

        const allergy: string[] = [];
        const avoid: string[] = [];

        foodSelect.foodIngredient.forEach(v => {
            (userData?.food?.avoid?.includes(v)) && avoid.push(v);
            (userData?.food?.allergy?.includes(v)) && allergy.push(v);
        });

        setWarning({ allergy, avoid })

        if (allergy.length > 0 || avoid.length > 0)
            setOpenWarning(true);
        else
            handelSubmit();
    }

    const handelSubmit = async () => {
        if (!foodSelect || !user?.uid) return;

        const data = new Date();
        const foodHistory: FoodHistory = { ...foodSelect, datetime: data.toISOString() };
        await addHistory(user.uid, foodHistory)

        setOpenWarning(false);
        setOpenMenu(false);
    }


    return (
        <PageStart className="p-4 gap-3">
            <div className="text-center">
                <h2>Suggestion</h2>
            </div>
            <div className="flex w-full flex-col gap-3">
                {
                    foodList?.map((v, i) => <FoodItem food={v} key={i} like={false} onClick={() => handelSelect(i)} />)
                }
            </div>
            <Paper sx={{ position: 'fixed', bottom: 70, left: 8, right: 8 }} elevation={3}>
                <Autocomplete
                    freeSolo
                    options={foodList?.map((option) => `${option.thaiName} - ${option.englishName.replaceAll("_", " ")}`)}
                    renderInput={(params) => <TextField {...params} label="กินอะไรดี? : แตะเพื่อค้นหาเมนูกว่า 200 เมนู" />}
                />
            </Paper>
            {
                openDialog && <UserDialog onClick={() => router.push('/register-info')} />
            }
            <WarningDialog setOpen={() => { setOpenWarning(false); }}
                open={openWarning}
                warning={warning}
                onSubmit={handelSubmit}
            />

            <Drawer
                anchor={'bottom'}
                open={openMenu}
                className="relative"
            >
                <AddMenu food={foodSelect} onClose={() => setOpenMenu(false)} onSelect={handelEat} />
            </Drawer>
        </PageStart>
    )
}

export default HomePage

interface WarningProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    warning: Warning;
    onSubmit: () => void
}

const WarningDialog: React.FC<WarningProps> = ({ open, warning, setOpen, onSubmit }) => {
    return (
        <Dialog open={open}>
            <DialogTitle className="text-center" color={"error"}>คำเตือน!</DialogTitle>
            <DialogContent className="text-left flex flex-col gap-3">
                <p className="text-main">อาหารชนิดนี้ประกอบด้วยวัตถุดิบที่คุณ</p>
                {
                    warning.allergy.length > 0 &&
                    <div className="w-full flex flex-wrap gap-3">
                        <h4>แพ้</h4>
                        {warning.allergy.map(v => <p key={v} className="text-main">{v}</p>)}
                    </div>
                }
                {
                    warning.avoid.length > 0 &&
                    <div className="w-full flex flex-wrap gap-3">
                        <h4>หลักเลี่ยง</h4>
                        {warning.avoid.map(v => <p key={v} className="text-main">{v}</p>)}
                    </div>
                }
                <div className="mt-5 w-full flex justify-between items-center flex-row gap-3">
                    <Button sx={{ px: 3 }} color="error" variant="outlined" onClick={() => setOpen(false)}>
                        ยกเลิก
                    </Button>
                    <Button sx={{ px: 3 }} color="info" variant="contained" onClick={() => onSubmit()}>
                        รับทราบ
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

interface UserDialogProps {
    onClick: () => void
}

const UserDialog: React.FC<UserDialogProps> = ({ onClick }) => {
    return (
        <Dialog open={true} >
            <DialogTitle className="text-center">โอ๊! คุณยังไม่ได้ใส่ข้อมูลส่วนตัว</DialogTitle>
            <DialogContent className="text-center flex flex-col items-center gap-3">
                <p>เพื่อที่เราจะสามารถแนะนำอาหารให้คุณได้ โปรดบันทึกข้อมูลส่วนตัว</p>
                <Button color="info" variant="contained" onClick={onClick}>
                    รับทราบ
                </Button>
            </DialogContent>
        </Dialog >
    )
}
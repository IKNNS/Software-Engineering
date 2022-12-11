import { getAll } from "@libs/database/food"
import { useAuth } from "@libs/firebase/useAuth"
import { Food } from "@models/Food_Model"
import { UserAccount } from "@models/User_Model"
import { PageStart } from "components/common/Page"
import FoodItem from "components/home/FoodItem"
import Account from "@libs/database/user"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import AddMenu from "components/home/AddMenu"
import { Autocomplete, Paper, TextField, Dialog, DialogTitle, DialogContent, Button, Drawer } from "@mui/material"

const HomePage: NextPage = () => {

    const [userData, setUserData] = useState<UserAccount>()

    const [foodList, setFoodList] = useState<Food[]>([])
    const [openDialog, setOpenDialog] = useState(false);

    const [foodSelect, setFoodSelect] = useState<Food>();
    const [openMenu, setOpenMenu] = useState(false);

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

    const handelLike = async (value: boolean, name: string) => {
        if (!user || !userData) return;

        let old = userData?.like ?? []

        if (value) {
            if (!old.includes(name)) old.push(name)
        } else {
            if (old.includes(name)) old = old.filter(v => v != name)
        }

        await Account.updateLike(user.uid, old)
        setUserData({ ...userData, like: old })
    }

    return (
        <PageStart className="p-4 gap-3 pt-10">
            <div className="text-center">
                <h1>Suggestion</h1>
            </div>
            <div className="flex w-full flex-col gap-3 pb-36">
                {
                    foodList?.map((v, i) => <FoodItem food={v} key={i}
                        like={userData?.like?.includes(v.thaiName)}
                        onClick={() => handelSelect(i)}
                        onLike={(value) => handelLike(value, v.thaiName)}
                    />)
                }
            </div>
            <Paper sx={{ position: "fixed", bottom: 70, left: 8, right: 8 }} elevation={3}>
                <Autocomplete
                    freeSolo
                    options={foodList?.map((option) => `${option.thaiName} - ${option.englishName.replaceAll("_", " ")}`)}
                    renderInput={(params) => <TextField {...params} label="กินอะไรดี? : แตะเพื่อค้นหาเมนูกว่า 200 เมนู" />}
                />
            </Paper>
            {
                openDialog && <UserDialog onClick={() => router.push("/register-info")} />
            }
            <Drawer
                anchor={"bottom"}
                open={openMenu}
                className="relative"
            >
                <AddMenu food={foodSelect}
                    uid={user?.uid}
                    onClose={() => setOpenMenu(false)}
                    userData={userData}
                />
            </Drawer>
        </PageStart>
    )
}

export default HomePage


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
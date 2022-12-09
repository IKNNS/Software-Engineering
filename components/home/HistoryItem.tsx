import { Button } from "@mui/material";
import Image from "next/image"
import { FoodHistory } from "@models/Food_Module";
import EnergyIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import { useEffect, useState } from "react";

interface Props {
    food: FoodHistory;
    onClick?: () => void;
}

const HistoryItem: React.FC<Props> = ({ food, onClick }) => {

    const [date, setDate] = useState("")

    useEffect(() => {
        if (!food) return;

        const date = new Date(food.datetime)
        setDate(date.toLocaleString())
    }, [food])

    return (
        <div className="w-full p-3 shadow-md text-main rounded-3xl flex justify-start gap-3">
            <div className=" w-[80px] h-[80px] rounded-full shadow-out2">
                <Image src={food.imgURL != "" ? food.imgURL : "/unknow.png"} width={80} height={80} objectFit="cover" alt="img" className=" rounded-full" />
            </div>
            <div className="flex flex-col gap-1"
                onClick={() => onClick?.()}
            >
                <p className="text-main">{food.thaiName}</p>
                <div className="w-full flex justify-start items-center gap">
                    <EnergyIcon fontSize="medium" sx={{ color: "#FF7878" }} />
                    <p>{food?.foodEnergy} Kcal</p>
                </div>
                <p className=" text-sm">{date}</p>
            </div>
            <div className="ml-auto">
                <Button color="info" sx={{ "fontWeight": 300 }}>แก้ไข</Button>
            </div>
        </div>
    )
}

export default HistoryItem;
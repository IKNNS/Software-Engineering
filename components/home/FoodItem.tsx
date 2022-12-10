import { Button, IconButton, Typography } from "@mui/material";
import Image from "next/image"
import styles from "@styles/Home.module.css"
import { Food } from "@models/Food_Module";
import EnergyIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import HeartIcon from '@mui/icons-material/FavoriteBorderRounded';
import FullHeartIcon from '@mui/icons-material/FavoriteRounded';

interface Props {
    food: Food;
    like?: boolean;
    onClick?: () => void;
    onLike?: (value: boolean) => void;
}

const FoodItem: React.FC<Props> = ({ food, onClick, like, onLike }) => {
    return (
        <div className="w-full p-3 shadow-md text-main rounded-3xl flex justify-start gap-3">
            <div className=" w-[80px] h-[80px] rounded-full shadow-out2">
                <Image src={food.imgURL != "" ? food.imgURL : "/unknow.png"} width={80} height={80} objectFit="cover" alt="img" className=" rounded-full" />
            </div>
            <div className="flex flex-col gap-2"
                onClick={() => onClick?.()}
            >
                <p className="text-main">{food.thaiName}</p>
                <div className="w-full flex justify-start items-center gap">
                    <EnergyIcon fontSize="medium" sx={{ color: "#FF7878" }} />
                    <p>{food?.foodEnergy} Kcal</p>
                </div>
            </div>
            <div className="ml-auto">
                <IconButton
                    sx={{ color: '#FF7878' }}
                    onClick={(e) => { e.preventDefault(); onLike?.(!like) }}
                >
                    {like ? <FullHeartIcon /> : <HeartIcon />}
                </IconButton>
            </div>
        </div>
    )
}

export default FoodItem;
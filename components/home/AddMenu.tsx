import { Food } from "@models/Food_Module"
import { Button, Chip, IconButton } from "@mui/material"
import AutoInput from "components/common/AutoInput"
import { useEffect, useState } from "react"
import EnergyIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import Image from 'next/image'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

interface ListProps {
    food?: Food;
    onClose?: () => void;
    onSelect?: () => void;
}

const AddHistoryForm: React.FC<ListProps> = (props) => {

    const [food, setFood] = useState<Food>()

    useEffect(() => {
        setFood(props.food);
    }, [props.food])

    return (
        <div className="relative w-screnn h-[100vh] bg-white overflow-auto shadow-out flex flex-col justify-start items-center gap-3 p-4">
            <div className="w-full text-left">
                <IconButton color="inherit" onClick={() => props.onClose?.()}>
                    <ArrowBackRoundedIcon />
                </IconButton>
            </div>
            <div className="w-[200px] h-[200px] rounded-full shadow-out2 mb-3">
                {food?.imgURL && <Image src={food.imgURL} width={200} height={200} objectFit="cover" alt="Cover" className=" rounded-full" />}
            </div>
            <div className="w-full text-left">
                <h2>{food?.thaiName} - {food?.englishName}</h2>
            </div>
            <div className="w-full flex justify-start items-center">
                <EnergyIcon fontSize="large" sx={{ color: "#E97777" }} />
                <p>พลังงาน {food?.foodEnergy} Kcal</p>
            </div>
            <div className="w-full flex justify-start items-center flex-wrap gap-3">
                {
                    food?.foodType.map((v, i) => <Chip label={v} key={i} />)
                }
            </div>
            <div className="w-full text-left mt-3">
                <h3>ส่วนประกอบ</h3>
            </div>
            <div className="w-full flex justify-start items-center flex-wrap gap-3">
                {
                    food?.foodIngredient.map((v, i) => <Chip label={v.replaceAll(":", "")} key={i} />)
                }
            </div>
            <div className="mt-auto mb-5">
                <Button color="info" variant="contained" sx={{ px: 3 }} onClick={() => props.onSelect?.()}>
                    เลือกเมนูนี้เลย
                </Button>
            </div>
        </div >
    )
}

export default AddHistoryForm;
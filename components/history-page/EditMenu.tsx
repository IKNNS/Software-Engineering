import { Food, FoodHistory } from "@models/Food_Model"
import { Button, Chip, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import AutoInput from "components/common/AutoInput"
import { useCallback, useEffect, useState } from "react"
import EnergyIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import Image from "next/image"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DateInput from "components/common/DateInput";
import { UserAccount, UserFood } from "@models/User_Model";
import { addHistory, deleteHisotry, updateHisotry } from "@libs/database/food";
import { color } from "@libs/color-map";
import { IAvoid } from "@models/Avoid_Model";
import { getAllDisease } from "@libs/database/disease";
import { getAllStyle } from "@libs/database/foodStyle";

interface Warning {
    allergy: string[];
    avoid: string[];
    disease: IAvoid[];
    foodType: IAvoid[];
}

interface ListProps {
    uid?: string
    food?: FoodHistory;
    userData?: UserAccount;
    onClose?: () => void;
    onChange?: () => void;
}

const EditHisotryForm: React.FC<ListProps> = (props) => {

    const [warning, setWarning] = useState<Warning>({ allergy: [], avoid: [], disease: [], foodType: [] });
    const [openWarning, setOpenWarning] = useState(false);

    const [food, setFood] = useState<FoodHistory | undefined>(props.food)
    const [date, setDate] = useState<string>("")

    const handelEat = async () => {
        if (!food || !props.userData) return;

        const allergy: string[] = [];
        const avoid: string[] = [];

        food.foodIngredient.forEach(v => {
            (props.userData?.food?.avoid?.includes(v)) && avoid.push(v);
            (props.userData?.food?.allergy?.includes(v)) && allergy.push(v);
        });

        const userDisease = await filterDisease()
        const disease: IAvoid[] = userDisease.filter(v => {
            return v.avoidList.some(v => food.foodIngredient.includes(v))
        })
        const userFoodType = await filterFoodType();
        const foodType: IAvoid[] = userFoodType.filter(v => {
            return v.avoidList.some(v => food.foodIngredient.includes(v))
        })

        setWarning({ allergy, avoid, disease, foodType })

        if (allergy.length > 0 || avoid.length > 0 || disease.length > 0 || foodType.length > 0)
            setOpenWarning(true);
        else
            handleSubmit();
    }

    const handleSubmit = async () => {
        if (!food || !props.uid) return;

        const foodHistory: FoodHistory = { ...food, datetime: date };
        await updateHisotry(props.uid, foodHistory)

        setOpenWarning(false);
        props.onChange?.();
        props.onClose?.();
    }

    const handleDelete = async () => {
        if (!food || !props.uid) return;

        await deleteHisotry(props.uid, food)
        setOpenWarning(false);
        props.onChange?.();
        props.onClose?.();
    }

    const filterDisease = useCallback(async (): Promise<IAvoid[]> => {
        if (!props.userData) return []

        const data: IAvoid[] = await getAllDisease().catch(e => []);
        return data.filter((v) => props.userData?.info?.disease?.includes(v.name))

    }, [props.userData])

    const filterFoodType = useCallback(async (): Promise<IAvoid[]> => {
        if (!props.userData) return []

        const data: IAvoid[] = await getAllStyle().catch(e => []);
        return data.filter((v) => props.userData?.food?.foodType?.includes(v.name))

    }, [props.userData])

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
                    food?.foodIngredient.map((v, i) => <Chip label={v} key={i} sx={{ background: color.get(v) }} />)
                }
            </div>
            <div className="mt-auto w-full">
                <DateInput onChange={(v) => setDate(v)} defaultValue={food?.datetime} />
            </div>
            <div className="mb-5 mt-3 flex gap-3">
                <Button color="error" variant="outlined" sx={{ px: 3 }} onClick={handleDelete}>
                    ลบ
                </Button>
                <Button color="info" variant="contained" sx={{ px: 3 }} onClick={handelEat}>
                    บันทึกเมนูอาหาร
                </Button>
            </div>

            <WarningDialog setOpen={() => { setOpenWarning(false); }}
                open={openWarning}
                warning={warning}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default EditHisotryForm;


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
                    warning.disease.length > 0 &&
                    <div className="w-full flex flex-wrap gap-3">
                        <h4>อันตรายต่อโรค</h4>
                        {warning.disease.map(v => <p key={v.name} className="text-main">{v.name}</p>)}
                    </div>
                }
                {
                    warning.foodType.length > 0 &&
                    <div className="w-full flex flex-wrap gap-3">
                        <h4>ไม่ควรรับประทานในกลุ่ม</h4>
                        {warning.foodType.map(v => <p key={v.name} className="text-main">{v.name}</p>)}
                    </div>
                }
                {
                    warning.allergy.length > 0 &&
                    <div className="w-full flex flex-wrap gap-3">
                        <h4>มีอาการแพ้</h4>
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
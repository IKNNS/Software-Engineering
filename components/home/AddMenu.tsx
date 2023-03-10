import { Food, FoodHistory } from "@models/Food_Model"
import { Button, Chip, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import AutoInput from "components/common/AutoInput"
import { useCallback, useEffect, useState } from "react"
import EnergyIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import Image from "next/image"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DateInput from "components/common/DateInput";
import { UserAccount, UserFood } from "@models/User_Model";
import { addHistory } from "@libs/database/food";
import { color } from "@libs/color-map";
import { getAllDisease } from "@libs/database/disease";
import { IAvoid } from "@models/Avoid_Model";
import { getAllStyle } from "@libs/database/foodStyle";

interface Warning {
    allergy: string[];
    avoid: string[];
    disease: IAvoid[];
    foodType: IAvoid[];
}

interface ListProps {
    uid?: string
    food?: Food;
    userData?: UserAccount;
    onClose?: () => void;
}

const AddHistoryForm: React.FC<ListProps> = (props) => {

    const [warning, setWarning] = useState<Warning>({ allergy: [], avoid: [], disease: [], foodType: [] });
    const [openWarning, setOpenWarning] = useState(false);

    const [food, setFood] = useState<Food | undefined>(props.food)
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
            handelSubmit();
    }

    const handelSubmit = async () => {
        if (!food || !props.uid) return;

        const foodHistory: FoodHistory = { ...food, datetime: date };
        await addHistory(props.uid, foodHistory)

        setOpenWarning(false);
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
                <p>????????????????????? {food?.foodEnergy} Kcal</p>
            </div>
            <div className="w-full flex justify-start items-center flex-wrap gap-3">
                {
                    food?.foodType.map((v, i) => <Chip label={v} key={i} />)
                }
            </div>
            <div className="w-full text-left mt-3">
                <h3>??????????????????????????????</h3>
            </div>
            <div className="w-full flex justify-start items-center flex-wrap gap-3">
                {
                    food?.foodIngredient.map((v, i) => <Chip label={v} key={i} sx={{ background: color.get(v) }} />)
                }
            </div>
            <div className="mt-auto w-full">
                <DateInput onChange={(v) => setDate(v)} />
            </div>
            <div className="mb-5 mt-3">
                <Button color="info" variant="contained" sx={{ px: 3 }} onClick={handelEat}>
                    ??????????????????????????????????????????
                </Button>
            </div>

            <WarningDialog setOpen={() => { setOpenWarning(false); }}
                open={openWarning}
                warning={warning}
                onSubmit={handelSubmit}
            />
        </div>
    )
}

export default AddHistoryForm;


interface WarningProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    warning: Warning;
    onSubmit: () => void
}

const WarningDialog: React.FC<WarningProps> = ({ open, warning, setOpen, onSubmit }) => {
    return (
        <Dialog open={open}>
            <DialogTitle className="text-center" color={"error"}>?????????????????????!</DialogTitle>
            <DialogContent className="text-left flex flex-col gap-3">
                <p className="text-main">??????????????????????????????????????????????????????????????????????????????????????????</p>
                {
                    warning.disease.length > 0 &&
                    <div className="w-full flex flex-wrap gap-3">
                        <h4>???????????????????????????????????????</h4>
                        {warning.disease.map(v => <p key={v.name} className="text-main">{v.name}</p>)}
                    </div>
                }
                {
                    warning.foodType.length > 0 &&
                    <div className="w-full flex flex-wrap gap-3">
                        <h4>??????????????????????????????????????????????????????????????????</h4>
                        {warning.foodType.map(v => <p key={v.name} className="text-main">{v.name}</p>)}
                    </div>
                }
                {
                    warning.allergy.length > 0 &&
                    <div className="w-full flex flex-wrap gap-3">
                        <h4>??????????????????????????????</h4>
                        {warning.allergy.map(v => <p key={v} className="text-main">{v}</p>)}
                    </div>
                }
                {
                    warning.avoid.length > 0 &&
                    <div className="w-full flex flex-wrap gap-3">
                        <h4>??????????????????????????????</h4>
                        {warning.avoid.map(v => <p key={v} className="text-main">{v}</p>)}
                    </div>
                }

                <div className="mt-5 w-full flex justify-between items-center flex-row gap-3">
                    <Button sx={{ px: 3 }} color="error" variant="outlined" onClick={() => setOpen(false)}>
                        ??????????????????
                    </Button>
                    <Button sx={{ px: 3 }} color="info" variant="contained" onClick={() => onSubmit()}>
                        ?????????????????????
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
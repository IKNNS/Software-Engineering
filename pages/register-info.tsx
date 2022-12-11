import { getAll } from "@libs/database/food";
import { Food } from "@models/Food_Model";
import { UserInfo, UserFood } from "@models/User_Model";
import { PageStart } from "components/common/Page";
import FormFood from "components/registerfood/foodform";
import FormInfo from "components/registerfood/infoform";
import Account from "@libs/database/user";
import { useAuth } from "@libs/firebase/useAuth";

import FinishIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LikeForm from "components/registerfood/likeform";

const steps = ["ข้อมูลส่วนตัว", "อาหารและสุขภาพ", "อาหารที่ชอบ"];

const RegisterInfoPage: NextPage = () => {

    const [user] = useAuth()
    const router = useRouter()

    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState<UserInfo & UserFood>({ gender: "female" })
    const [like, setLike] = useState<string[]>([]);

    const [foodList, setFoodList] = useState<Food[]>([]);
    const [isError, setIsError] = useState({
        age: false,
        height: false,
        weight: false
    })

    const handleNext = () => {
        if (activeStep == 0) {
            const err = {
                age: !data.age || data.age == 0,
                height: !data.height || data.height == 0,
                weight: !data.weight || data.weight == 0
            }
            setIsError(err);
            if (err.age || err.height || err.weight) return;
        }
        if (activeStep == 3) {
            onSubmit();
            return;
        }
        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        if (activeStep > 0) setActiveStep(activeStep - 1)
    }

    const onSubmit = () => {
        const food: UserFood = {
            eatingType: data.eatingType ?? [],
            avoid: data.avoid ?? [],
            allergy: data.avoid ?? [],
        };
        const info: UserInfo = {
            gender: data.gender,
            age: data.age,
            weight: data.weight,
            height: data.height,
            disease: data.disease ?? [],
        };

        Account.updateAll(user?.uid!, food, info, like)
            .then(() => router.push("/home"))
            .catch((e) => console.log(e));
    }

    useEffect(() => {

        getAll()
            .then(value => setFoodList(value))
            .catch(e => console.log(e))

    }, [])

    return (
        <React.Fragment>
            <div className="w-full shadow top-0 fixed bg-white z-10 pt-4 pb-2 ">
                <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "100%" }}>
                    {
                        steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel className="items-center">{labelText(label)}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
            </div>
            <PageStart className="p-4 gap-5 bg-action">
                <div className="w-full h-auto pt-4 pb-10 mt-24 bg-white rounded-xl shadow">
                    {activeStep == 0 && <FormInfo value={data} isError={isError} onChange={(v) => setData({ ...data, ...v })} />}
                    {activeStep == 1 && <FormFood value={data} onChange={(v) => setData({ ...data, ...v })} />}
                    {activeStep == 2 && <LikeForm list={foodList} onChange={(v) => setLike(v)} />}
                    {activeStep == 3 && (
                        <div className="w-full flex flex-col justify-center items-center">
                            <FinishIcon sx={{ fontSize: "50px" }} color="success" />
                            <Typography sx={{ mt: 2, mb: 1 }}>กรอกครบแล้ว เย่!!</Typography>
                        </div>
                    )}
                </div>
            </PageStart>
            <div className="fixed bottom-0 bg-white shadow-out flex flex-row justify-between w-full p-4">
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                    กลับ
                </Button>
                <Button onClick={handleNext}>
                    {activeStep == 3 ? "ตกลง" : "ต่อไป"}
                </Button>
            </div>
        </React.Fragment>
    )
}

export default RegisterInfoPage

const labelText = (label: string) => <div className="text-sm text-center min-w-[100px]">{label}</div>
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Registerfood1 from "./registerfood1";
import Registerfood2 from "./registerfood2";
import Registerfood3 from "./registerfood3";
import { useEffect, useState } from "react";
import { UserFood, UserInfo } from "@models/User_Model";
import { GetAllFood } from "@libs/firebase/foodData";
import { UpdateUserFood, UpdateUserInfo } from "@libs/firebase/userData";
import { FoodInfo } from "@models/Food_Module";
import { Auth, getAuth } from "firebase/auth";
import { useAuth } from '@libs/firebase/useAuth';
import { useRouter } from "next/router";

const steps = ["ประวัติส่วนตัว", "ประวัติการกินอาหาร", "อาหารที่ชอบ"];

interface Props {
  step: number
  uid: string,
  onSubmit: (isSubmit: boolean) => void
}

const Registerfood: React.FC<Props> = ({ step, uid, onSubmit }) => {

  const [info, setInfo] = useState<UserInfo>({ gender: "female" })
  const [food, setFood] = useState<UserFood>({})
  const [isError, setIsError] = useState({ weight: false, height: false });
  const [activeStep, setActiveStep] = useState(0);


  const [foodList, setFoodList] = useState<FoodInfo[]>([]);

  useEffect(() => {
    GetAllFood().then(res => {
      setFoodList(res)
    }).catch(e => console.log(e));
  }, [])

  const handleNext = () => {

    setIsError((err) => ({ ...err, weight: !info?.weight }));
    setIsError((err) => ({ ...err, height: !info?.height }));

    if (!info) return;

    if (activeStep === 3) return;

    if (info.weight && info.height)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    console.log(info, food);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const submit = async () => {
    onSubmit?.(true);
    await UpdateUserFood(uid, food)
    await UpdateUserInfo(uid, info)
    onSubmit?.(false);
  }

  return (
    <div hidden={step == 0} className={`fixed z-20 transition-all delay-300 md:left-[calc(50%-225px)] left-0 ${step == 2 ? 'md:bottom-[20%] bottom-0' : '-bottom-[100%]'}`}>
      <div className='fixed w-screen h-screen top-0 left-0 bg-black opacity-10 -z-10'></div>
      <div className='md:w-[450px] md:h-auto h-full w-full flex flex-col justify-center items-center bg-white py-5 px-5 rounded-md shadow-md text-base'>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "200px" }}>
              <Typography sx={{ mt: 2, mb: 1 }}>กรอกครบแล้ว เย่!!</Typography>
            </Box>
            <Box sx={{ display: "flex", pt: 2, justifyContent: "space-between", "width": "100%" }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={() => setActiveStep(0)}
                sx={{ mr: 1 }}
              >
                แก้ไข
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" onClick={() => submit()}>เพิ่มข้อมูล</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && <Registerfood1 value={info} onChange={(v) => setInfo({ ...info, ...v })} isError={isError} />}
            {activeStep === 1 && <Registerfood2 value={food} list={foodList} onChange={(v) => setFood({ ...food, ...v })} />}
            {activeStep === 2 && <Registerfood3 list={foodList} />}
            <Box width={"100%"} sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 3 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                กลับ
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                ต่อไป
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Registerfood;
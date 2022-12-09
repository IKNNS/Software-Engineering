import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Registerfood1 from "./registerfood/registerfood1";
import Registerfood2 from "./registerfood/registerfood2";
import Registerfood3 from "./registerfood/registerfood3";
import { Container } from "@mui/system";
import { useState } from "react";
import { error } from "console";

const steps = ["ประวัติส่วนตัว", "ประวัติการกินอาหาร", "อาหารที่ชอบ"];

export default function Registerfood() {
  //registerfood1
  const [weight, setWeight] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");

  const [isError, setIsError] = useState({ weight: false, height: false });
  const [activeStep, setActiveStep] = useState(0);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {

    // always set isError status
    setIsError({weight: (weight === ""), height: (height === "")})
  
    // if error, don't go next page
    if ((weight === "" || height === "") && activeStep === 0){
      return;
    }
  
    // go next page
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped((prevSkipped) => {
    //   const newSkipped = new Set(prevSkipped.values());
    //   newSkipped.add(activeStep);
    //   return newSkipped;
    // });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container sx={{ marginTop: "4rem" }}>
      <Box sx={{ width: "100%" }}>
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
            <Typography sx={{ mt: 2, mb: 1 }}>กรอกข้อมูลครบแล้ว!!</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              {/* <Button onClick={handleReset}>Reset</Button> */}
              <Button variant="contained">เริ่มต้นใช้งาน</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <Registerfood1
                setWeight={setWeight}
                setHeight={setHeight}
                weight={weight}
                height={height}
                isError={isError}
              />
            )}
            {activeStep === 1 && <Registerfood2 />}
            {activeStep === 2 && <Registerfood3 />}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}

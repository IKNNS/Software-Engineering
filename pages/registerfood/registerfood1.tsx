import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
interface IImage {
  id: number;
  img: string;
  isSelected: boolean;
}
interface IProps {
  setWeight: React.Dispatch<React.SetStateAction<number | string>>;
  setHeight: React.Dispatch<React.SetStateAction<number | string>>;
  weight: number | string;
  height: number | string;
  isError: any;
}
export default function Registerfood1({
  setWeight,
  setHeight,
  weight,
  height,
  isError,
}: IProps) {
  return (
    <Container>
      <Stack alignItems="center">
        <Stack sx={{ m: 3, width: "100%" }} spacing={3}>
          <Typography variant="h6">น้ำหนัก</Typography>
          <TextField
            error={isError.weight}
            required
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            id="text1"
            type="number"
            label="น้ำหนัก"
          />

          <Typography variant="h6">ส่วนสูง</Typography>
          <TextField
            error={isError.height}
            required
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            id="outlined-required"
            type="number"
            label="ส่วนสูง"
          />
          <FormControl>
            <Typography variant="h6">เพศ</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="หญิง"
              />
              <FormControlLabel value="male" control={<Radio />} label="ชาย" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="ไม่ระบุ"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Stack>
    </Container>
  );
}

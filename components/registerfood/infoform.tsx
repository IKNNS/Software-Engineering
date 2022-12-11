import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import WeightIcon from '@mui/icons-material/AccessibilityNewRounded';
import HeightIcon from '@mui/icons-material/Man4Rounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import { Container } from "@mui/system";
import { UserInfo } from "@models/User_Model";
import InputText from "@components/common/TextInput";

interface IProps {
  isError?: any;
  value?: UserInfo
  onChange?: (value: UserInfo) => void;
}

const genders = [
  {
    name: "female",
    color: "#f06292",
    icon: <FemaleRoundedIcon sx={{ color: "white" }} fontSize="large" />
  },
  {
    name: "male",
    color: "#3f51b5",
    icon: <MaleRoundedIcon sx={{ color: "white" }} fontSize="large" />
  },
  {
    name: "other",
    color: "#90969D",
    icon: <MoreHorizRoundedIcon sx={{ color: "white" }} fontSize="large" />
  }
]

const genderThai: { [key: string]: string; } = {
  "female": "หญิง",
  "male": "ชาย",
  "other": "ไม่ระบุ"
}

export default function InfoForm({ isError, onChange, value }: IProps) {

  return (
    <Container>
        <Stack direction={'column'} sx={{ width: "100%" }} spacing={2}>
          <Typography variant="h6">ข้อมูลส่วนตัว</Typography>
          <InputText
            required
            err={isError?.age}
            value={value?.age ?? ""}
            type="number"
            label="อายุ"
            icon={<CakeRoundedIcon color="secondary" sx={{ mt: 3 }} />}
            onChange={(val) => onChange?.({ age: val === "" ? undefined : parseInt(val) })}
          />
          <InputText
            required
            err={isError?.weight}
            value={value?.weight ?? ""}
            type="number"
            label="น้ำหนัก"
            icon={<WeightIcon color="secondary" sx={{ mt: 3 }} />}
            onChange={(val) => onChange?.({ weight: val === "" ? undefined : parseInt(val) })}
          />
          <InputText
            required
            err={isError?.height}
            value={value?.height ?? ""}
            type="number"
            label="ส่วนสูง"
            icon={<HeightIcon color="secondary" sx={{ mt: 3 }} />}
            onChange={(val) => onChange?.({ height: val === "" ? undefined : parseInt(val) })}
          />
          {/* <FormControl>
          <Typography variant="h6">เพศ</Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value?.gender}
            onChange={(e, v) => onChange?.({ gender: v })}
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
        </FormControl> */}

          <Stack direction={"row"} justifyContent={"flex-start"} alignItems={'center'} spacing={4} pl={1} pt={2}>
            <Typography variant="body1" >เพศ</Typography>
            {
              genders.map((v, i) => (
                <div className="relative" key={i} onClick={() => onChange?.({ gender: v.name })}>
                  <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={40} height={40}
                    borderRadius={"100%"}
                    sx={{
                      backgroundColor: value?.gender == v.name ? v.color : "#e0e0e0",
                      transition: "background 0.3s"
                    }}
                  >
                    {v.icon}
                  </Box>
                  <div className="absolute top-full text-center w-full">{genderThai[v.name]}</div>
                </div>
              ))
            }
          </Stack>
        </Stack>
    </Container>
  );
}

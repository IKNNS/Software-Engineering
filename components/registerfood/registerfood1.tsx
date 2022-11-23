import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { UserInfo } from "@models/User_Model";

interface IProps {
  isError: any;
  value?: UserInfo
  onChange: (value: UserInfo) => void;
}
export default function Registerfood1({ isError, onChange, value }: IProps) {

  return (
    <Container>
      <Stack alignItems="center">
        <Stack sx={{ m: 3, width: "100%" }} spacing={3}>
          <Typography variant="h6">น้ำหนัก</Typography>
          <TextField
          className='bg-white'
            error={isError.weight}
            required
            value={value?.weight ?? ""}
            onChange={(event) => {
              const val = event.target.value;
              onChange({weight: val === "" ? undefined : parseInt(val) })
            }}
            id="text1"
            type="number"
            label="น้ำหนัก"
          />

          <Typography variant="h6">ส่วนสูง</Typography>
          <TextField
          className='bg-white'
            error={isError.height}
            required
            value={value?.height ?? ""}
            onChange={(event) => {
              const val = event.target.value;
              onChange({height: val === "" ? undefined : parseInt(val) })
            }}
            id="outlined-required"
            type="number"
            label="ส่วนสูง"
          />
          <FormControl>
            <Typography variant="h6">เพศ</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={value?.gender}
              onChange={(e, v) => onChange({gender: v })}
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

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  ImageListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { type } from "os";
import React, { useState } from "react";

export default function registerfood() {
  const [congenitalDisease, setCongenitalDisease] = useState([
    "โรคเบาหวาน",
    "โรคไต",
    "โรคเก๊า",
  ]);
  const [types, setTypes] = useState(["มัง", "เจ", "คลีน"]);
  const [foodAllergys, setFoodAllergys] = useState([
    "กุ้ง",
    "เนื้อ",
    "ไก่",
    "นม",
  ]);
  const [dislikedFoods, setDislikedFoods] = useState([
    "ข้าวผัด",
    "ข้าวมันไก่",
    "ไก่ทอด",
    "สลัด",
  ]);
  return (
    <Container>
      <Stack alignItems="center">   
        <Stack sx={{ m: 3 }} spacing={3}>
          <Typography variant="h5">คุณเหมาะกับอาหารแบบไหน?</Typography>
          <Typography variant="h6">ประเภทอาหารที่ทาน</Typography>
          <Autocomplete
            multiple
            limitTags={5}
            id="multiple-limit-tags"
            options={types}
            getOptionLabel={(option) => option}
            defaultValue={[types[0]]}
            renderInput={(params) => (
              <TextField {...params} label="ประเภทอาหารที่ทาน" placeholder="" />
            )}
            sx={{ width: "100%" }}
          />
          <Typography variant="h6">โรคประจำตัว</Typography>
          <Autocomplete
            multiple
            limitTags={5}
            id="multiple-limit-tags"
            options={congenitalDisease}
            getOptionLabel={(option) => option}
            defaultValue={[congenitalDisease[0]]}
            renderInput={(params) => (
              <TextField {...params} label="โรคประจำตัว" placeholder="" />
            )}
            sx={{ width: "100%" }}
          />
          <Typography variant="h6">วัตถุดิบที่แพ้</Typography>
          <Autocomplete
            multiple
            limitTags={5}
            id="multiple-limit-tags"
            options={foodAllergys}
            getOptionLabel={(option) => option}
            defaultValue={[foodAllergys[0]]}
            renderInput={(params) => (
              <TextField {...params} label="วัตถุดิบที่แพ้" placeholder="" />
            )}
            sx={{ width: "100%" }}
          />
          <Typography variant="h6">วัตถุดิบที่หลีกเลี่ยง</Typography>
          <Autocomplete
            multiple
            limitTags={5}
            id="multiple-limit-tags"
            options={dislikedFoods}
            getOptionLabel={(option) => option}
            defaultValue={[dislikedFoods[0]]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="วัตถุดิบที่หลีกเลี่ยง"
                placeholder=""
              />
            )}
            sx={{ width: "100%" }}
          />
         <Button variant="contained">เพิ่ม</Button>
        </Stack> 
            
         
      </Stack>
    </Container>
  );
}

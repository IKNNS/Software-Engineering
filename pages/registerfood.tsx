import {
  Autocomplete,
  Box,
  Button,
  ImageListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { type } from "os";
import React from "react";

export default function registerfood() {
  return (
    <Container>
      <Stack alignItems="center">
        <Stack spacing={3}>
          <Typography variant="h3">คุณเหมาะกับอาหารแบบไหน?</Typography>
          <Typography variant="h5">ประเภทอาหารที่ทานได้</Typography>
          <TextField
            id="outlined-basic"
            label="ประเภทอาหารที่ทานได้"
            variant="outlined"
          />
          <Typography variant="h5">โรคประจำตัว</Typography>
          <TextField
            id="outlined-basic"
            label="โรคประจำตัว"
            variant="outlined"
          />
          <Typography variant="h5">อาหารที่แพ้</Typography>
          <TextField
            id="outlined-basic"
            label="อาหารที่แพ้"
            variant="outlined"
          />
          <Typography variant="h5">อาหารที่หลีกเลี่ยง</Typography>
          <TextField
            id="outlined-basic"
            label="อาหารที่หลีกเลี่ยงหรือไม่ชอบทาน"
            variant="outlined"
          />

          <Button variant="contained">เพิ่ม</Button>
        </Stack>
      </Stack>
    </Container>
  );
}

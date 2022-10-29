import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { type } from "os";
import React from "react";

export default function register1() {
  const types = ["kdsdjas", "djkasdja", "dkoapdso"];
  return (
    <Container>
      <Stack alignItems="center">
        <Typography variant="h3">
          สลัด
        </Typography>

        <img
          style={{ textAlign: "center" }}
          src="https://img2.thaipng.com/20180730/qt/kisspng-greek-salad-israeli-salad-spinach-salad-fattoush-v-crispy-strips-5b5ed58c3a41d1.1533177415329417082386.jpg"
        />
        <Button variant="contained">เพิ่ม</Button>

        <Stack spacing={2}>
          <Typography variant="h5" >
            ประเภทอาหาร:
          </Typography>

          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={types}
            getOptionLabel={(option) => option}
            defaultValue={[types[0]]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="limitTags"
                placeholder="Favorites"
              />
            )}
            sx={{ width: "500px" }}
          />
        </Stack>
      </Stack>
    </Container>
  );
}

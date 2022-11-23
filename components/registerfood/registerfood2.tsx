import { FoodInfo } from "@models/Food_Module";
import { UserFood } from "@models/User_Model";
import {
  Autocomplete,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";

interface IProps {
  value?: UserFood;
  onChange: (data: UserFood | undefined) => void;
  list: FoodInfo[];
}

export default function Registerfood2({ list, onChange, value }: IProps) {

  const [congenitalDisease] = useState(["โรคเบาหวาน", "โรคไต", "โรคเก๊า"]);
  const [types, setTypes] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string[]>([]);

  useEffect(() => {
    let _types: string[] = [];
    let _ingredient: string[] = [];

    for (let i = 0; i < list.length; i++) {
      _types = [..._types, ...list[i].foodType ?? []];
      _ingredient = [..._ingredient, ...list[i].foodIngredient ?? []];
    }

    setTypes([...new Set(_types)])
    setIngredient([...new Set(_ingredient)])
  }, [list])

  return (
    <Container>
      <Stack alignItems="center">
        <Stack sx={{ m: 3, width: "100%" }} spacing={3}>
          <Typography variant="h6">ประเภทอาหารที่ทาน</Typography>
          <Autocomplete
            multiple
            limitTags={5}
            id="multiple-limit-tags"
            options={types}
            getOptionLabel={(option) => option}
            value={value?.eatingType ?? []}
            onChange={(e, v) => onChange({ eatingType: v })}
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
            value={value?.disease ?? []}
            onChange={(e, v) => onChange({ disease: v })}
            getOptionLabel={(option) => option}
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
            options={ingredient}
            getOptionLabel={(option) => option}
            value={value?.allergy ?? []}
            onChange={(e, v) => onChange({ allergy: v })}
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
            options={ingredient}
            value={value?.avoid ?? []}
            onChange={(e, v) => onChange({ avoid: v })}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="วัตถุดิบที่หลีกเลี่ยง"
                placeholder=""
              />
            )}
            sx={{ width: "100%" }}
          />
        </Stack>
      </Stack>
    </Container>
  );
}

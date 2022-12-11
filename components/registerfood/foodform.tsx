import { Food } from "@models/Food_Model";
import { UserFood, UserInfo } from "@models/User_Model";
import AutoInput from "@components/common/AutoInput";

import { Stack, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import FoodIcon from '@mui/icons-material/RestaurantRounded';
import DiseaseIcon from '@mui/icons-material/LocalHospitalRounded';
import AllergyIcon from '@mui/icons-material/NoMealsRounded';
import FastfoodIcon from '@mui/icons-material/FastfoodRounded';
import { getAllDisease } from "@libs/database/disease";
import { getIngredient, getTypes } from "@libs/database/food";

interface IProps {
    value?: UserInfo & UserFood;
    onChange?: (data: UserInfo & UserFood | undefined) => void;
}

export default function FoodForm({ value, onChange }: IProps) {

    const [types, setTypes] = useState<string[]>([]);
    const [ingredient, setIngredient] = useState<string[]>([]);
    const [disease, setDisease] = useState<string[]>([])

    useEffect(() => {
        getTypes()
            .then(v => setTypes(v))
            .catch(e => console.log(e))

        getIngredient()
            .then(v => setIngredient(v))
            .catch(e => console.log(e))

        getAllDisease()
            .then(v => setDisease(v.map(d => d.name)))
            .catch(e => console.log(e));
    }, [])

    return (
        <Container>
            <Stack direction={'column'} sx={{ width: "100%" }} spacing={2}>
                <Typography variant="h6"> โรคประจำตัว</Typography>
                <AutoInput label="โรคประจำตัว"
                    list={disease}
                    value={value?.disease ?? []}
                    onChange={v => onChange?.({ disease: v })}
                    icon={<DiseaseIcon color="secondary" sx={{ mt: "5px" }} />}
                />
                <Typography variant="h6">ประเภทอาหารที่ทาน</Typography>
                <AutoInput label="ประเภทอาหารที่ทาน"
                    list={types}
                    value={value?.eatingType}
                    onChange={v => onChange?.({ eatingType: v })}
                    icon={<FoodIcon color="secondary" sx={{ mt: "5px" }} />}
                />
                <Typography variant="h6">วัตถุดิบที่แพ้</Typography>
                <AutoInput label="วัตถุดิบที่แพ้"
                    list={ingredient}
                    value={value?.allergy}
                    onChange={v => onChange?.({ allergy: v })}
                    icon={<AllergyIcon color="secondary" sx={{ mt: "5px" }} />}
                />
                <Typography variant="h6">วัตถุดิบที่หลีกเลี่ยง</Typography>
                <AutoInput label="วัตถุดิบที่หลีกเลี่ยง"
                    list={ingredient}
                    value={value?.avoid}
                    onChange={v => onChange?.({ avoid: v })}
                    icon={<FastfoodIcon color="secondary" sx={{ mt: "5px" }} />}
                />
            </Stack>
        </Container>
    );
}

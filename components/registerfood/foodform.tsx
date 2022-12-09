import { Food } from "@models/Food_Module";
import { UserFood, UserInfo } from "@models/User_Model";
import AutoInput from "components/common/AutoInput";

import { Stack, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import FoodIcon from '@mui/icons-material/RestaurantRounded';
import DiseaseIcon from '@mui/icons-material/LocalHospitalRounded';
import AllergyIcon from '@mui/icons-material/NoMealsRounded';
import FastfoodIcon from '@mui/icons-material/FastfoodRounded';

interface IProps {
    value?: UserInfo & UserFood;
    onChange?: (data: UserInfo & UserFood | undefined) => void;
    list: Food[];
}

const diseaseList = ["โรคเบาหวาน", "โรคไต", "โรคเก๊า"];

export default function FoodForm({ list, value, onChange }: IProps) {

    const [types, setTypes] = useState<string[]>([]);
    const [ingredient, setIngredient] = useState<string[]>([]);

    useEffect(() => {
        const types: string[] = [];
        const ingredient: string[] = [];

        for (let i = 0; i < list.length; i++) {
            types.push(...list[i].foodType);
            ingredient.push(...list[i].foodIngredient);
        }

        setTypes([...new Set(types)])
        setIngredient([...new Set(ingredient)])

    }, [list])

    return (
        <Container>
            <Stack direction={'column'} sx={{ width: "100%" }} spacing={2}>
                <Typography variant="h6"> โรคประจำตัว</Typography>
                <AutoInput label="โรคประจำตัว"
                    list={diseaseList}
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

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
export default function Registerfood2() {
  const [congenitalDisease] = useState(["โรคเบาหวาน", "โรคไต", "โรคเก๊า"]);
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
  const [images, setImages] = useState<IImage[]>([
    {
      id: 1,
      img: "https://d3ldzx7fxfvsfy.cloudfront.net/kraft8x/17/1654757113314_883x1501.jpg",
      isSelected: false,
    },
    {
      id: 2,
      img: "https://food.fnr.sndimg.com/content/dam/images/food/products/2022/3/11/rx_goldbelly-clinton-street-diner-zeus-burger.jpg.rend.hgtvcom.406.305.suffix/1647019464547.jpeg",
      isSelected: false,
    },
    {
      id: 3,
      img: "https://goldbelly.imgix.net/uploads/card/image/926/TopChefMealKits-Homepage-Feature-Banner-Template-1.gif?ixlib=react-9.0.2&auto=format&ar=2%3A1",
      isSelected: false,
    },
    {
      id: 4,
      img: "https://a.cdn-hotels.com/gdcs/production109/d913/52127df7-ccff-4762-8255-01b3ba749fca.jpg",
      isSelected: false,
    },
    {
      id: 5,
      img: "https://colonydiner.com/wp-content/uploads/2021/03/French.jpg",
      isSelected: false,
    },
    {
      id: 6,
      img: "https://food.fnr.sndimg.com/content/dam/images/food/products/2022/3/11/rx_goldbelly-clinton-street-diner-zeus-burger.jpg.rend.hgtvcom.406.305.suffix/1647019464547.jpeg",
      isSelected: false,
    },
    {
      id: 7,
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
      isSelected: false,
    },
    {
      id: 8,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0PWUpMlEaC9SYA1VuUwOzbF0bCi2wpRnpLg&usqp=CAU",
      isSelected: false,
    },
    {
      id: 9,
      img: "https://cdn.cpdonline.co.uk/wp-content/uploads/2019/04/28164206/The-14-Food-Allergens.jpg",
      isSelected: false,
    },
  ]);
  function handleOnClick(image: IImage): void {
    const updateImages = images.map((item) => {
      if (item.id === image.id) {
        return { ...item, isSelected: !item.isSelected };
      }

      return item;
    });

    setImages(updateImages);
  }

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
        </Stack>
      </Stack>
    </Container>
  );
}

import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FoodInfo } from "@models/Food_Module";
import { UserFood } from "@models/User_Model";
import { useEffect } from "react";
import Image from "next/image";

interface IImage {
  name: string
  img: string;
  isSelected: boolean;
}

interface IProps {
  list: FoodInfo[];
}

export default function Registerfood3({ list }: IProps) {

  const [images, setImages] = useState<IImage[]>([])

  function handleOnClick(index: number) {
    const updateImages = [...images];
    updateImages[index].isSelected = !images[index].isSelected;
    setImages(updateImages);
  }

  useEffect(() => {

    const images: IImage[] = list?.map(v => { return { name: v.englishName, img: v.imgURL, isSelected: false } })
    setImages(images);

  }, [])

  return (
    <Container>
      <Stack alignItems="center">
        <Stack sx={{ m: 3, width: "100%",maxHeight:"500px",overflow:"auto" }} spacing={3}>
          <ImageList cols={3}>
            {
              images.map((item, i) => item.img !== "" &&
                <ImageListItem key={i}>
                  <ImageBlock item={item} index={i} onClick={(index) => handleOnClick(index)} />
                </ImageListItem>)
            }
          </ImageList>
        </Stack>
      </Stack>
    </Container>
  );
}

interface IImageBlock {
  item: IImage,
  index: number,
  onClick: (index: number) => void
}

const ImageBlock = ({ item, index, onClick }: IImageBlock) => (
  <React.Fragment>
    <Image
      src={item.img}
      width={164}
      height={164}
      objectFit='cover'
      alt={item.name}
      onClick={() => onClick(index)}
      loading="lazy"
    />
    <ImageListItemBar
      sx={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      }}
      // title={item.title}
      position="top"
      actionIcon={
        <IconButton
          sx={{ color: "white" }}
          aria-label={`star ${item.img}`}
        >
          {item.isSelected && <CheckCircleIcon />}
        </IconButton>
      }
      actionPosition="left"
    />
  </React.Fragment>
)
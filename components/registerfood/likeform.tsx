import {
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { Food } from "@models/Food_Model";
import { useEffect } from "react";
import Image from "next/image";

import HeartIcon from "@mui/icons-material/FavoriteBorderRounded";
import FullHeartIcon from "@mui/icons-material/FavoriteRounded";

interface IImage {
    name: string
    img: string;
}

interface Props {
    list: Food[];
    onChange: (value: string[]) => void
}

export default function LikeForm({ list, onChange }: Props) {

    const [images, setImages] = useState<IImage[]>([])
    const [select, setSelect] = useState<string[]>([])

    function handleOnClick(name: string) {
        if (select.includes(name))
            setSelect(select.filter(v => v != name))
        else
            setSelect([...select, name]);

        onChange(select);
    }

    useEffect(() => {

        const images: IImage[] = list?.map(v => { return { name: v.thaiName, img: v.imgURL } })
        setImages(images);

    }, [list])

    return (
        <Container>
            <Stack direction={"column"} sx={{ width: "100%" }}>
                <ImageList cols={3} gap={10}>
                    {
                        images.map((item, i) => item.img !== "" &&
                            <ImageBlock key={i}
                                name={item.name}
                                url={item.img}
                                like={select.includes(item.name)}
                                onClick={() => handleOnClick(item.name)}
                            />
                        )
                    }
                </ImageList>
            </Stack>
        </Container>
    );
}

interface ImageProps {
    name: string
    url: string,
    like: boolean
    onClick: () => void
}

const ImageBlock: React.FC<ImageProps> = ({ name, url, like, onClick }) => (
    <React.Fragment>
        <ImageListItem sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 0 5px 0 #90969D" }} onClick={(e) => { e.preventDefault(); onClick?.() }}>
            <Image src={url} width={150} height={150} alt={"image"} objectFit="cover" />
            <ImageListItemBar
                sx={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                        "rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
                }}
                position="top"
                actionIcon={
                    <React.Fragment >
                        <IconButton
                            sx={{ color: "#d50000" }}
                        >
                            {like ? <FullHeartIcon fontSize="small" /> : <HeartIcon fontSize="small" />}
                        </IconButton>
                    </React.Fragment>
                }
                actionPosition="left"
            />
        </ImageListItem>
    </React.Fragment>
)
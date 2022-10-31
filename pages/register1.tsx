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
import React, { useState } from "react";
interface ITag {
  name: string;
  color: string;
}
export default function register1() {
  const [types, setTypes] = useState<ITag[]>([
    { name: "มังสาวิรัส", color: "#FF0" },
  ]);
  const [ingredients, setIngredients] = useState([
    "ผัก",
    "ไข่",
    "น้ำสลัด",
  ]);
}
//   const [img, setImg] = useState(
//     "https://d1imgdcsrvbfip.cloudfront.net/attachment_images/c97e07d09e40f900b9c1b2c72613b5a9a78f39ea.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXVZDCJJC5AJQ47UT%2F20210617%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20210617T151048Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Security-Token=FwoGZXIvYXdzEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDNULeBC%2FEJ4%2FjzrCyiKbAwAax%2Fs6FeHEWfaxl7VNbWb%2FoJfswQpvNJIKiQj2BdKqglqd%2Bse9ux6Wqoq6FUyllFnNL7SiroMj8MhluoULu0PVW0W5WPrxzbrIow06desSh1QBfGdqFrUdbdfNy1GRYOwKXeKCRr5T9eJBmsVNfMxrol7y0KGEZ%2FegAIg0VoXvQqBuo3Y5JV0Ag94H61iLv6vNq%2BwgbTzRda68ta494705aMwz6bF2aigXHIEWCvrEHviAmXS8K1uOPJ6auBLkVVa%2Bv9gdhQcUDDwSZU073Rs%2BafNQHSmwwuwZ1ybXgeBZREm6ac3QiLmAe0D8xjPOsnONRKaBoswdes1dY12bjpzae%2FnbvPtEI5QjQ3km3XyFAO6003u%2BTs8ByKvRYnJyOe9kDokpAW1uDyc0Y6nopgLSHu%2BBp63UEl%2BQCDQpDsdCht5tF2qbFAgmcL8Q3g8SqnMao6ULT7MxL5Szf84LMSKvvTtR8EGnq0dNrcK7kBouqPe6h3jAyoeRr1kwD5%2Bc5dbn%2B3glrPK%2BOUIcCo4%2BxRKBWDVEcJ3FRyYQvijHya2GBjI1FgNGm2nxIyJafRgxih4x4ec14civqQG9yQ%2BOMPPPjwFse5HcJd6%2FsYnUAmYtrlizOGNufcE%3D&X-Amz-Signature=8c516f5f797c211ed9c9a6edcdaf03d38eb300420b5be1f4d17ba90e9cddc862"
//   );
//   return (
//     <Container>
//       <Stack alignItems="center">
//         <Typography variant="h3">สลัด</Typography>
//         <Box>
//           <ImageListItem>
//             <img
//               src={`${img}?w=164&h=164&fit=crop&auto=format`}
//               srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//               alt={"สลัด"}
//               loading="lazy"
//             />
//           </ImageListItem>
//           <Stack sx={{ width: "100%" }} alignItems="flex-end">
//             <Button variant="contained">เพิ่ม</Button>
//           </Stack>
//         </Box>

//         <Stack spacing={2}>
//           <Typography variant="h5">ประเภทอาหาร:</Typography>

//           <Autocomplete
//             multiple
//             limitTags={2}
//             id="multiple-limit-tags"
//             options={types}
//             getOptionLabel={(option) => option.name}
//             defaultValue={[types[0]]}
//             renderInput={(params) => (
//               <TextField {...params} label="limitTags" placeholder="" />
//             )}
//             sx={{ width: "500px" }}
//           />

//           <Typography variant="h5">วัตถุดิบ:</Typography>

//           <Autocomplete
//             multiple
//             limitTags={2}
//             id="multiple-limit-tags"
//             options={ingredients}
//             getOptionLabel={(option) => option}
//             defaultValue={[ingredients[0]]}
//             renderInput={(params) => (
//               <TextField {...params} label="limitTags" placeholder="" />
//             )}
//             sx={{ width: "500px" }}
//           />
//         </Stack>
//       </Stack>
//     </Container>
//   );
// }

import { PageStart } from "components/common/Page"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    List,
    ListItem,
    Typography,
} from "@mui/material";

import { NextPage } from "next"

const Notification: NextPage = () => {
    return (
        <PageStart className="p-4 gap-5">
            <div className="text-center">
                <h2>Notification</h2>
            </div>
            <List className="flex w-full flex-col gap-3">
                {[1, 2, 3].map((value) => (
                    <ListItem>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </PageStart>
    );
};

export default Notification
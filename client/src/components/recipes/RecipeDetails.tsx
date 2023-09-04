import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Recipe } from '../backendTypes';
import { Box, Divider, List, ListItem } from '@mui/material';

export function RecipeDetails(props: { recipe: Recipe }) {


    const { recipe } = props;
    return (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Card sx={{ maxWidth: 500 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {recipe.title[0].toLocaleUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={recipe.title}
                    subheader={recipe.meal_category}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="https://images.ctfassets.net/qu53tdnhexvd/10E8Q6B9myA2Q8Gw0Qm8yg/d4c94b4daca9ad989faea563a7b64ddd/Halloumi_curry.jpg?w=1920&h=1080"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {recipe.description}
                    </Typography>
                </CardContent>

                <CardContent>
                    <Divider sx={{ marginBottom: "1.2vw", borderBottomWidth: "1px", background: "black" }} />
                    <Typography variant="h5" paragraph>Ingredients:</Typography>
                    {recipe.ingredients.map((i) => (
                        <Typography key={i} component={'span'} sx={{ display: "flex", alignItems: "center" }}>
                            <List sx={{ marginLeft: "1.8vw", listStyleType: "disc" }} aria-label="recipe">
                                <ListItem key={i} sx={{ display: 'list-item', height: "1vw" }}>
                                    <span>{i}</span>
                                </ListItem>
                            </List>
                        </Typography>
                    ))}
                    <Divider sx={{ marginTop: "2vw", marginBottom: "2vw", borderBottomWidth: "1px", background: "black" }} />
                    <Typography variant="h5" paragraph>Instructions:</Typography>
                    {recipe.preparation_steps.map((s) => (
                        <Typography key={s} component={'span'} sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ marginRight: "1vw", bgcolor: blue[500], height: 20, width: 20 }} aria-label="recipe">
                                <span>{recipe.preparation_steps.indexOf(s) + 1}</span>
                            </Avatar>{s}
                        </Typography>
                    ))}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
}

export default RecipeDetails;
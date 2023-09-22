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
import { Box, Container, Divider, Grid, List, ListItem } from '@mui/material';
import RecipeDialog from './RecipeDialog';
import { RemoveRecipeDialog } from './RemoveRecipeDialog';

export function RecipeDetails(props: { recipe: Recipe, callback: () => void }) {


    const { recipe, callback } = props;

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <RecipeDialog callback={callback} recipe={recipe} />
                <RemoveRecipeDialog callback={callback} recipe={recipe} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "2vw" }}>
                <Container>
                    <Grid
                        component="div"
                        container
                        spacing={3}
                        direction="row"
                        alignItems="stretch"
                    >
                        <Grid item xs={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Card>
                                        <Divider sx={{ marginBottom: "1.5vw", borderBottomWidth: "1px", background: "black" }} />
                                        <Typography sx={{marginLeft:"10px"}} variant="h5" paragraph>Ingredients:</Typography>
                                        {recipe.ingredients.map((i) => (
                                            <Typography key={i} component={'span'} sx={{ display: "flex", alignItems: "center",marginBottom:"10px" }}>
                                                <List sx={{ marginLeft: "1.8vw", listStyleType: "disc" }} aria-label="recipe">
                                                    <ListItem key={i} sx={{ display: 'list-item', height: "0vw" }}>
                                                        <span>{i}</span>
                                                    </ListItem>
                                                </List>
                                            </Typography>
                                        ))}
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5" paragraph>Instructions:</Typography>
                                            {recipe.preparation_steps.map((s) => (
                                                <Typography key={s} component={'span'} sx={{ display: "flex", alignItems: "center" }}>
                                                    <Avatar sx={{ marginRight: "1vw", bgcolor: blue[500], height: 20, width: 20 }} aria-label="recipe">
                                                        <span>{recipe.preparation_steps.indexOf(s) + 1}</span>
                                                    </Avatar>{s}
                                                </Typography>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid style={{ height: "100%" }}>
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
                                        height="434"
                                        image={recipe.image}
                                        alt={recipe.title}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {recipe.description}
                                        </Typography>
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

                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default RecipeDetails;
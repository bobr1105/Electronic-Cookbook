import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader, CardMedia, Grid, IconButton } from '@mui/material';
import { Recipe } from '../backendTypes';
import { useRecipes } from '../../hooks';
import Loading from '../../Loading';
import Error from '../../Error';
import { useParams } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
function Recipes() {

  const params = useParams();
  const { recipes, loading, error, reload } = useRecipes();

  if (loading) return (<Loading />)
  if (error) return (<Error message={error as String} />)

  const item = recipes.find((r) => r.id === params.id);

  if (item !== undefined) {
    return (<RecipeDetails id={item.id} />)
  }
  return (
    <Grid sx={{ marginLeft: "1vw" }} container spacing={4} columns={{ xs: 2, sm: 2, md: 2 }}>
      {recipes.map(recipe => (
        <Grid item key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}

function RecipeCard(props: { recipe: Recipe }) {

  const { recipe } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={recipe.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.preparation_steps[0]}
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
  );
}

export default Recipes;
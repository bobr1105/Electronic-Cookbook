import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardHeader, CardMedia, FormControl, Grid, IconButton, TextField } from '@mui/material';
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
import { useEffect, useState } from 'react';
function Recipes() {

  const params = useParams();
  const { recipes, loading, error } = useRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(search)
      )
    );
  }, [recipes, search])

  if (loading) return (<Loading />)
  if (error) return (<Error message={error as String} />)

  const item = recipes.find((r) => r.id === params.id);

  if (item !== undefined) {
    return (<RecipeDetails recipe={item} />)
  }
  return (
    <>
      <FormControl sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{
            'fieldset': {
              border: '1px solid grey!important',
              borderRadius: "5px",
            }
          }}
          InputLabelProps={{ style: { color: "grey", outlineColor: "white" } }}
          InputProps={{ style: { borderColor: "grey", color: "white", width: "250px" } }} value={search}
          onChange={e => { setSearch(e.target.value.toLowerCase()) }}
          label="Search" id="outlined-basic" variant="outlined" />
      </FormControl>
      <RecipesGrid recipes={filteredRecipes} />

    </>
  );
}

export function RecipeCard(props: { recipe: Recipe }) {

  const { recipe } = props;
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {recipe.title[0].toUpperCase()}
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
        height="254"
        image="https://images.ctfassets.net/qu53tdnhexvd/10E8Q6B9myA2Q8Gw0Qm8yg/d4c94b4daca9ad989faea563a7b64ddd/Halloumi_curry.jpg?w=1920&h=1080"
        alt="Paella dish"
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
        <Button href={`recipes/${recipe.id}`}>Read recipe</Button>
      </CardActions>
    </Card>
  );
}

export function RecipesGrid(props: { recipes: Recipe[] }) {
  const { recipes } = props;

  return (
    <Grid style={{ margin: 'auto', marginLeft: 70 }} container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 4, md: 10 }}>

      {recipes.map(recipe => (
        <Grid xs={3} item key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Recipes;
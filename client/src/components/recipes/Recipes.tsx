import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardHeader, CardMedia, FormControl, Grid, IconButton, InputLabel, OutlinedInput, TextField, colors } from '@mui/material';
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
import { Clear } from '@mui/icons-material';
function Recipes() {

  const params = useParams();
  const { recipes, loading, error, reload } = useRecipes();
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
          sx={{borderRadius:"5px"}}
          InputLabelProps={{ style: { color: "grey",outlineColor:"white" } }} 
          InputProps={{style:{color:"white"}}} value={search}
          onChange={e => { setSearch(e.target.value.toLowerCase()) }}
          label="Search" id="outlined-basic" variant="outlined" />
      </FormControl>
      <Grid style={{ margin: 'auto', marginLeft: 70 }} container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 4, md: 10 }}>

        {filteredRecipes.map(recipe => (
          <Grid xs={3} item key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function RecipeCard(props: { recipe: Recipe }) {

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
        height="194"
        image="https://www.thewholesomedish.com/wp-content/uploads/2019/02/The-Best-Classic-Shepherds-Pie-600X900.jpg"
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


export default Recipes;
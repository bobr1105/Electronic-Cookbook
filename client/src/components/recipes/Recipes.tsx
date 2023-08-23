import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Recipe } from '../backendTypes';
import { useRecipes } from '../../hooks';

function Recipes() {

  const { recipes, loading, reload } = useRecipes();
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {recipes.map(recipe => (
        <Grid item xs={2} sm={4} md={4} key={recipe.meal_category.toLocaleString()}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}

function RecipeCard(props: { recipe: Recipe }) {

  const { recipe } = props;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {recipe.meal_category}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {recipe.meal_category}
        </Typography>
        <Typography variant="body2">
          {recipe.preparation_steps[0]}
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default Recipes;
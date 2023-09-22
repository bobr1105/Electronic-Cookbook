import { Box } from "@mui/material";
import { RecipesGrid } from "../recipes/Recipes";
import { useRecipes } from "../../hooks";
import Loading from "../../Loading";
import Error from '../../Error';
import RecipeDialog from "../recipes/RecipeDialog";

export function Admin() {
    const { recipes, loading, error, reload } = useRecipes();

    if (loading) return (<Loading />)
    if (error) return (<Error message={error as String} />)

    return (
        <Box>
            <RecipeDialog callback={reload}/>
            <RecipesGrid recipes={recipes} />
        </Box>
    )
}

export default Admin;
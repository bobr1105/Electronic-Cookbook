import { Box, Button } from "@mui/material";
import { RecipesGrid } from "../recipes/Recipes";
import { useRecipes } from "../../hooks";
import Loading from "../../Loading";
import Error from '../../Error';

export function Admin() {
    const { recipes, loading, error } = useRecipes();

    if (loading) return (<Loading />)
    if (error) return (<Error message={error as String} />)
    return (
        <Box>
            <Button sx={{ color: "orange", border: "1px solid orange", minWidth: "150px", padding: "10px", marginLeft: "46vw" }}>Add recipe</Button>
            <RecipesGrid recipes={recipes} />
        </Box>
    )
}

export default Admin;
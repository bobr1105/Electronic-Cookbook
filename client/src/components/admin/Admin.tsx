import { Box, Button } from "@mui/material";
import { RecipesGrid } from "../recipes/Recipes";
import { useRecipes } from "../../hooks";
import Loading from "../../Loading";
import Error from '../../Error';
import RecipeDialog from "../recipes/RecipeDialog";
import { useState } from "react";

export function Admin() {
    const { recipes, loading, error } = useRecipes();
    const [open, setOpen] = useState(false);

    if (loading) return (<Loading />)
    if (error) return (<Error message={error as String} />)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Box>
            <Button onClick={handleOpen} sx={{ color: "orange", border: "1px solid orange", minWidth: "150px", padding: "10px", marginLeft: "46vw" }}>Add recipe</Button>
            <RecipeDialog open={open} close={handleClose} />
            <RecipesGrid recipes={recipes} />
        </Box>
    )
}

export default Admin;
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Recipe } from "../backendTypes";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { HttpClientContext } from "../../client";
import { useNavigate } from "react-router-dom";

export function RemoveRecipeDialog(props: { recipe: Recipe, callback: () => void }) {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { recipe, callback } = props;
    const client = useContext(HttpClientContext);
    const navigate = useNavigate();

    const removeRecipe = (recipe: Recipe) => {
        setLoading(true);
        client
            ?.delete(`/recipes/${recipe.id}`)
            .then(() => {
                console.log("Recipe has been removed");
                callback();
                navigate("/recipes")
                setOpen(false);
            })
            .catch((e: AxiosError) => {
                console.log(e);
            })
            .finally(() => setLoading(false));
    };
    return (
        <>
            <Button onClick={() => setOpen(true)} sx={{ border: "1px solid red", color: "red", padding: "10px", marginRight: "10px" }}>Remove recipe</Button>

            <Dialog open={open}>
                <DialogTitle>Remove recipe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove {recipe.title}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => removeRecipe(recipe)}>Remove</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RemoveRecipeDialog;
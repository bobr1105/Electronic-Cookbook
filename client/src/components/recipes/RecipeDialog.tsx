import * as Yup from "yup";
import { MealCategory, Recipe } from "../backendTypes";
import { ObjectShape } from "yup";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Field, FieldInputProps, Form, Formik } from "formik";
import Ingredients from "./Ingredients";
import { useContext, useState } from "react";
import { HttpClientContext } from "../../client";
import { AxiosError } from "axios";
import PreparationSteps from "./PreparationSteps";

export function RecipeDialog(props: { recipe?: Recipe, open: boolean, close: () => void, callback: () => void }) {

    const { recipe, open, close, callback } = props;
    const shape: ObjectShape = {
        id: Yup.string().uuid(),
        title: Yup.string(),
        description: Yup.string(),
        meal_category: Yup.string().oneOf(["Breakfast", "Lunch", "Dinner"]).required(),
        ingredients: Yup.array().of(Yup.string().required()),
    };
    const client = useContext(HttpClientContext);

    const schema = Yup.object().shape(shape);
    const dialogTitle = recipe !== undefined ? "Edit recipe" : "Add new recipe";
    const handleClose = () => {
        close();
    }
    const [loading, setLoading] = useState(false);

    const handleSubmit = (recipe: Recipe) => {
        console.log("This is the recipe", recipe);

        client
            ?.post(`/recipes`, recipe)
            .then(() => {
                console.log("Recipe added");
                callback();
                close();
            })
            .catch((e: AxiosError) => {
                console.log(e);
            })
            .finally(() => setLoading(false));
    };

    return (
        <Dialog open={open}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        recipe !== undefined ? recipe as Recipe :
                            ({
                                title: "",
                                description: "",
                                meal_category: MealCategory.Breakfast
                            } as unknown as Recipe)
                    }
                    onSubmit={handleSubmit}
                    validationSchema={schema}
                >
                    {({ getFieldMeta, values, handleSubmit, setFieldValue, setFieldTouched }) => {
                        return (
                            <Form>
                                <Field name="title">
                                    {({ field }: { field: FieldInputProps<unknown> }) => {
                                        const meta = getFieldMeta("title");
                                        return (
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                error={meta.touched && Boolean(meta.error)}
                                                helperText={
                                                    meta.touched && Boolean(meta.error) && meta.error
                                                }
                                                id="title"
                                                label="Recipe title"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                {...field}
                                            />
                                        );
                                    }}
                                </Field>

                                <Field name="description">
                                    {({ field }: { field: FieldInputProps<unknown> }) => {
                                        const meta = getFieldMeta("description");
                                        return (
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                error={meta.touched && Boolean(meta.error)}
                                                helperText={
                                                    meta.touched && Boolean(meta.error) && meta.error
                                                }
                                                id="description"
                                                label="Recipe description"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                {...field}
                                            />
                                        );
                                    }}
                                </Field>

                                <Field name="meal_category">
                                    {({ field }: { field: FieldInputProps<unknown> }) => {
                                        const meta = getFieldMeta("meal_category");
                                        return (
                                            <Select
                                                autoFocus
                                                margin="dense"
                                                error={meta.touched && Boolean(meta.error)}
                                                id="meal_category"
                                                label="Meal category"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                value={meta.value}
                                                onChange={(e: SelectChangeEvent<unknown>) => {
                                                    setFieldValue(
                                                        "meal_category",
                                                        e.target.value as MealCategory
                                                    )
                                                }}

                                            >
                                                {Object.keys(MealCategory).map(key => (
                                                    <MenuItem value={key} key={key}>{key}</MenuItem>))}
                                            </Select>
                                        );
                                    }}
                                </Field>

                                <Ingredients loading={loading}></Ingredients>
                                <PreparationSteps loading={loading}></PreparationSteps>

                                <DialogActions>
                                    <Button type="submit">Submit</Button>

                                    <Button onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Form>
                        );

                    }}
                </Formik>
            </DialogContent>

        </Dialog >
    );
}

export default RecipeDialog;
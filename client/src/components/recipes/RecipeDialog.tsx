import * as Yup from "yup";
import { MealCategory, Recipe } from "../backendTypes";
import { ObjectShape } from "yup";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Field, FieldInputProps, Form, Formik } from "formik";
import Ingredients from "./Ingredients";

export function RecipeDialog(props: { recipe?: Recipe, open: boolean, close: () => void }) {


    const { recipe, open, close } = props;
    const shape: ObjectShape = {
        id: Yup.string().uuid(),
        title: Yup.string(),
        description: Yup.string(),
        meal_category: Yup.string().oneOf(["Breakfast", "Lunch", "Dinner"]).required(),
        ingredients: Yup.array().of(Yup.string()),
    };

    const schema = Yup.object().shape(shape);
    const dialogTitle = recipe !== undefined ? "Edit recipe" : "Add new recipe";
    const handleClose = () => {
        close();
    }

    const handleSubmit = (values: Recipe) => {
        console.log("This is the recipe", values);
    }
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
                                        console.log(meta)
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

                                <Ingredients loading={false}></Ingredients>

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
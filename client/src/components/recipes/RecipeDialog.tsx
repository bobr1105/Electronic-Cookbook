import * as Yup from "yup";
import { MealCategory, Recipe } from "../backendTypes";
import { ObjectShape } from "yup";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import { Field, FieldInputProps, Form, Formik } from "formik";
import Ingredients from "./Ingredients";
import { useContext, useState } from "react";
import { HttpClientContext } from "../../client";
import { AxiosError } from "axios";
import PreparationSteps from "./PreparationSteps";
import Morselbar from "../Morselbar";

export function RecipeDialog(props: { recipe?: Recipe, callback: () => void }) {

    const { recipe, callback } = props;
    const shape: ObjectShape = {
        id: Yup.string().uuid(),
        title: Yup.string().required(),
        description: Yup.string().required(),
        meal_category: Yup.string().oneOf(["Breakfast", "Lunch", "Dinner"]).required(),
        ingredients: Yup.array().of(Yup.string().required()).required(),
    };
    const client = useContext(HttpClientContext);

    const schema = Yup.object().shape(shape);
    const dialogTitle = recipe !== undefined ? "Edit recipe" : "Add new recipe";

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState<{
        error?: string;
        content: string;
    }>({ content: "" });
    const handleSubmit = (recipe: Recipe) => {
        setLoading(true);
        setMessageOpen(false);
        setMessage({ content: "" });
        client
            ?.post(`/recipes`, recipe)
            .then(() => {
                console.log(recipe);
                setMessage({
                    error: undefined,
                    content: "Saved recipe",
                });
                callback();
                setOpen(false);
            })
            .catch((e: AxiosError) => {
                setMessage({
                    error: e.response?.data?.toString(),
                    content: "Failed to save recipe",
                });
                setMessageOpen(true);
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setOpen(true)} sx={{ border: "1px solid orange", color: "orange", padding: "10px", marginRight: "10px" }}>{dialogTitle}</Button>
            <Dialog open={open}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={
                            recipe !== undefined ? recipe as Recipe :
                                ({
                                    title: "",
                                    description: "",
                                    meal_category: MealCategory.Breakfast,
                                    preparation_steps: [],
                                    ingredients: []
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
                                                    id="meal_category"
                                                    label="Meal category"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    error={
                                                        meta.touched &&
                                                        Boolean(meta.error)
                                                    }
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

                                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                                    </DialogActions>
                                </Form>
                            );

                        }}
                    </Formik>
                </DialogContent>
            </Dialog >
            <Morselbar
                open={messageOpen}
                setOpen={setMessageOpen}
                content={message.content}
                error={message.error}
            />
        </Box>
    );
}

export default RecipeDialog;
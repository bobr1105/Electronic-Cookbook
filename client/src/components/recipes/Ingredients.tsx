import { Delete } from "@mui/icons-material";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import { useFormikContext, FieldMetaProps, FieldArray, Field, FieldInputProps, FieldArrayRenderProps } from "formik";
import { Recipe } from "../backendTypes";

function Ingredients(props: { loading: boolean }) {
    const loading = props.loading;

    const { values, getFieldMeta, handleChange } = useFormikContext<Recipe>();

    if (values.ingredients === undefined) return <></>;

    const meta: FieldMetaProps<string>[] = [];


    for (let i = 0; i < values.ingredients.length; i++) {
        const metaStep = `ingredients[${i}]`;
        meta.push(getFieldMeta(`${metaStep}`));
    }

    return (
        <FieldArray
            name="ingredients"
            render={(arrayHelpers: FieldArrayRenderProps) => (
                <>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            onClick={() => arrayHelpers.push("")}
                            disabled={loading}
                            color="secondary"
                        >
                            Add ingredient
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {values.ingredients?.map((ingredient, i) => (
                            <Box
                                key={i}
                                sx={{ display: "flex", alignItems: "center", gap: 2 }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                        width: "100%",
                                        alignItems: "baseline",
                                    }}
                                >
                                    <Field name={`ingredients[${i}]`} onChange={handleChange}>
                                        {({ field }: { field: FieldInputProps<unknown> }) => (
                                            <TextField
                                                label="Name"
                                                error={
                                                    meta[i].touched &&
                                                    Boolean(meta[i].error)
                                                }
                                                helperText={
                                                    meta[i].touched &&
                                                    Boolean(meta[i].error) &&
                                                    meta[i].error
                                                }
                                                disabled={loading}
                                                size="small"
                                                fullWidth
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                </Box>
                                <IconButton
                                    onClick={() => arrayHelpers.remove(i)}
                                    disabled={loading}
                                >
                                    <Delete color={loading ? "disabled" : "error"} />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        />

    );
}

export default Ingredients;
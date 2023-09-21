import { Delete } from "@mui/icons-material";
import { Box, Button, TextField, IconButton } from "@mui/material";
import { useFormikContext, FieldMetaProps, FieldArray, Field, FieldInputProps, FieldArrayRenderProps } from "formik";
import { Recipe } from "../backendTypes";

function PreparationSteps(props: { loading: boolean }) {
    const loading = props.loading;

    const { values, getFieldMeta, handleChange } = useFormikContext<Recipe>();
    const meta: FieldMetaProps<string>[] = [];

    if (values.preparation_steps === undefined) meta.push("step" as unknown as FieldMetaProps<string>);
    else {
        for (let i = 0; i < values.preparation_steps.length; i++) {
            const metaStep = `preparation_steps[${i}]`;
            meta.push(getFieldMeta(`${metaStep}`));
        }
    }

    return (
        <FieldArray
            name="preparation_steps"
            render={(arrayHelpers: FieldArrayRenderProps) => (
                <>
                    <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                        <Button sx={{ marginBottom: "10px" }}
                            onClick={() => arrayHelpers.push("")}
                            disabled={loading}
                            color="secondary"
                        >
                            Add step
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {values.preparation_steps?.map((step, i) => (
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
                                    <Field name={`preparation_steps[${i}]`} onChange={handleChange}>
                                        {({ field }: { field: FieldInputProps<unknown> }) => (
                                            <TextField
                                                label="Step"
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
            )
            }
        />

    );
}

export default PreparationSteps;
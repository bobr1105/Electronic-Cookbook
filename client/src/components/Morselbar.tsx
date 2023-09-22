import { Alert, Snackbar } from "@mui/material";

export default function Morselbar(props: {
    open: boolean;
    setOpen: (open: boolean) => void;
    content: string;
    error: string | undefined;
}) {
    const { open, setOpen, content, error } = props;

    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}
        >
            <Alert
                severity={error ? "error" : "success"}
                variant="filled"
                onClick={
                    error
                        ? () => { }
                        : undefined
                }
            >
                {error ? (
                    <>
                        {content}{" "}
                    </>
                ) : (
                    content
                )}
            </Alert>
        </Snackbar>
    );
}

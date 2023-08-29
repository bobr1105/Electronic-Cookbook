import { Close } from "@mui/icons-material";
import { Box, IconButton, LinearProgress, Typography } from "@mui/material";

function Loading(props: { close?: () => void }) {
  const { close } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", padding: 1, gap: 1 }}>
        <Typography variant="h6">Loading...</Typography>
        {close && (
          <IconButton
            onClick={() => {
              close();
            }}
          >
            <Close />
          </IconButton>
        )}
      </Box>
      <LinearProgress color="secondary" />
    </Box>
  );
}

export default Loading;

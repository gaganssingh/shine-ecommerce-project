import { Box, Typography } from "@mui/material";

export const DemoAccount = () => {
  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        backgroundColor: "#ccc",
        width: "350px",
        marginTop: 2,
      }}
    >
      <Typography variant="h6">Demo credentials:</Typography>
      <p>
        Email: <span>test@test.com</span>
      </p>
      <p>
        Password: <span>Pa$$1234</span>
      </p>
    </Box>
  );
};

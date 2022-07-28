import { Typography } from "@mui/material";

export const FormHeader = ({ title }: { title: string }) => {
  return (
    <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
      {title}
    </Typography>
  );
};

import { Grid } from "@mui/material";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Grid
      sx={{ p: 2 }}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <img src="logo512.png" alt="shine logo" height="40px" width="40px" />
      <main>{children}</main>
    </Grid>
  );
};

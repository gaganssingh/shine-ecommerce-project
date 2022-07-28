import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/utils/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <h1>App</h1>
    </ThemeProvider>
  );
};

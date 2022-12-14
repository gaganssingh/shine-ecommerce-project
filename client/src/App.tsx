import { ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./features/auth/components/PrivateRoute";
import { HomePage } from "./pages/home.page";
import { SigninPage } from "./pages/signin.page";
import { SignupPage } from "./pages/signup.page";
import { theme } from "./shared/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<PrivateRoute page={<HomePage />} />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </ThemeProvider>
  );
};

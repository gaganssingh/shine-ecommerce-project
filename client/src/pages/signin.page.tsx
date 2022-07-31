import { Box, CircularProgress } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { AuthLayout } from "../features/auth/components/AuthLayout";
import { DemoAccount } from "../features/auth/components/DemoAccount";
import { FormFooter } from "../features/auth/components/FormFooter";
import { SigninForm } from "../features/auth/components/SigninForm";
import { TermsAndConditions } from "../features/auth/components/TermsAndConditions";

export const SigninPage = () => {
  const { loading } = useAppSelector((state) => state.auth);

  return (
    <AuthLayout>
      {loading && (
        <CircularProgress
          sx={{
            marginTop: "64px",
            color: "primary",
          }}
        />
      )}
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderColor: "#cccccc",
          width: "350px",
          marginTop: 2,
        }}
      >
        <SigninForm />
        <TermsAndConditions text="By using this website" />
      </Box>
      <FormFooter title="New to Shine?" link="/signup" btnText="Sign Up" />
      <DemoAccount />
    </AuthLayout>
  );
};

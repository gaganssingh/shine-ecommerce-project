import { Box, CircularProgress } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { AuthLayout } from "../features/auth/components/AuthLayout";
import { DemoAccount } from "../features/auth/components/DemoAccount";
import { FormFooter } from "../features/auth/components/FormFooter";
import { SignupForm } from "../features/auth/components/SignupForm";
import { TermsAndConditions } from "../features/auth/components/TermsAndConditions";

export const SignupPage = () => {
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
        <SignupForm />
        <TermsAndConditions text="By creating an account" />
      </Box>
      <FormFooter
        title="Already have an account?"
        link="/signin"
        btnText="Sign In"
      />
      <DemoAccount />
    </AuthLayout>
  );
};

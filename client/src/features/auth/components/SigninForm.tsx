import { FormEvent, useEffect, useRef } from "react";
import { Grid, InputLabel, TextField, Button } from "@mui/material";
import { FormHeader } from "./FormHeader";
import { useInput } from "../../../hooks/input";
import { validateEmail } from "../../../shared/utils/validation/email-validation";
import { validatePasswordLength } from "../../../shared/utils/validation/length-validation";
import { validateFormData } from "../../../shared/utils/validation/validate-form-data";
import { validateFormErrors } from "../../../shared/utils/validation/validate-form-errors";
import { SigninUserType } from "../models/signin-user-type";

export const SigninForm = () => {
  const inputToFocusRef = useRef<HTMLInputElement | null>(null);

  const {
    text: email,
    error: emailError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    inputClearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    error: passwordError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    inputClearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  useEffect(() => {
    inputToFocusRef.current?.focus();
  }, []);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData({ email, password })) {
      return;
    }

    if (
      !validateFormErrors({
        emailError,
        passwordError,
      })
    ) {
      return;
    }

    const user: SigninUserType = {
      email,
      password,
    };

    console.log("Signing in with user info:", user);

    clearForm();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container direction="column" justifyContent="flex-start">
        <FormHeader title="Sign In" />

        {/* EMAIL INPUT */}
        <InputLabel
          sx={{ fontWeight: 500, marginTop: 1, color: "#000" }}
          htmlFor="email"
        >
          Email
        </InputLabel>
        <TextField
          inputRef={inputToFocusRef}
          type="email"
          name="email"
          id="email"
          variant="outlined"
          size="small"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailError}
          helperText={emailError && "Email must be provided"}
        />

        {/* PASSWORD INPUT */}
        <InputLabel
          sx={{ fontWeight: 500, marginTop: 1, color: "#000" }}
          htmlFor="password"
        >
          Password
        </InputLabel>
        <TextField
          type="password"
          name="password"
          id="password"
          variant="outlined"
          size="small"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordError}
          helperText={passwordError && "Password must be provided"}
        />

        {/* FORM SUBMIT BUTTON */}
        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: 16,
            height: 31,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Sign In
        </Button>
      </Grid>
    </form>
  );
};

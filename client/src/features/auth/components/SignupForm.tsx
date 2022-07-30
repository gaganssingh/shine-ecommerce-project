import { FormEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, InputLabel, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { signup } from "../services/auth.service";
import { reset } from "../authSlice";
import {
  validateNameLength,
  validatePasswordLength,
} from "../../../shared/utils/validation/length-validation";
import { useInput } from "../../../hooks/input";
import { validateEmail } from "../../../shared/utils/validation/email-validation";
import { validateFormData } from "../../../shared/utils/validation/validate-form-data";
import { validateFormErrors } from "../../../shared/utils/validation/validate-form-errors";
import { SignupUserType } from "../types/signup-user.type";
import { FormHeader } from "./FormHeader";

export const SignupForm: React.FC = () => {
  const inputToFocusRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputToFocusRef.current?.focus();
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { success } = useAppSelector((state) => state.auth);

  // Form State
  const {
    text: name,
    error: nameError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    inputClearHandler: nameClearHandler,
  } = useInput(validateNameLength);

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

  const {
    text: confirmPassword,
    error: confirmPasswordError,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputClearHandler: confirmPasswordClearHandler,
  } = useInput();

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  useEffect(() => {
    if (success) {
      dispatch(reset());
      clearForm();
      navigate("/");
    }
  }, [success, dispatch, navigate]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData({ name, email, password, confirmPassword })) {
      return;
    }

    if (
      !validateFormErrors({
        nameError,
        emailError,
        passwordError,
        confirmPasswordError,
      })
    ) {
      return;
    }

    const user: SignupUserType = {
      name,
      email,
      password,
    };

    console.log("Signing up with user info:", user);
    dispatch(signup(user));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container direction="column" justifyContent="flex-start">
        <FormHeader title="Sign Up" />

        {/* NAME INPUT */}
        <InputLabel
          sx={{ fontWeight: 500, marginTop: 1, color: "#000" }}
          htmlFor="name"
        >
          Name
        </InputLabel>
        <TextField
          inputRef={inputToFocusRef}
          type="text"
          name="name"
          id="name"
          variant="outlined"
          size="small"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          error={nameError}
          helperText={nameError && "Name must be provided"}
        />

        {/* EMAIL INPUT */}
        <InputLabel
          sx={{ fontWeight: 500, marginTop: 1, color: "#000" }}
          htmlFor="email"
        >
          Email
        </InputLabel>
        <TextField
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
          placeholder="Min 8 chars; Contains atleast 1 lower, 1 upper, 1 number, & 1 special character"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordError}
          helperText={passwordError && "Password must be provided"}
        />

        {/* CONFIRM PASSWORD INPUT */}
        <InputLabel
          sx={{ fontWeight: 500, marginTop: 1, color: "#000" }}
          htmlFor="confirmPassword"
        >
          Confirm Password
        </InputLabel>
        <TextField
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          variant="outlined"
          size="small"
          placeholder="Match the password"
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          error={confirmPassword.length > 0 && confirmPassword !== password}
          helperText={
            confirmPassword.length > 0 &&
            confirmPassword !== password &&
            "Must confirm the password"
          }
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
          Sign Up
        </Button>
      </Grid>
    </form>
  );
};

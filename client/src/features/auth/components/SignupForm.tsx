import { FormEvent, useEffect, useRef } from "react";
import { Grid, TextField, InputLabel, Button } from "@mui/material";
import { FormHeader } from "./FormHeader";

export const SignupForm: React.FC = () => {
  const inputToFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputToFocusRef.current?.focus();
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signing up....");
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
          placeholder="Must match the password"
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

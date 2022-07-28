import { FormEvent, useEffect, useRef } from "react";
import { Grid, InputLabel, TextField, Button } from "@mui/material";
import { FormHeader } from "./FormHeader";

export const SigninForm = () => {
  const inputToFocusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputToFocusRef.current?.focus();
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signing in....");
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

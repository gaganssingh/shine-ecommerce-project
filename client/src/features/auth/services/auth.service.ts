import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SignupUserType } from "../types/signup-user.type";

// ASYNC THUNKS
export const signup = createAsyncThunk(
  "auth/signup",
  async (userDetails: SignupUserType, thunkApi) => {
    console.log("userDetails", userDetails);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/signup`,
        userDetails
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(`Signup failed`);
    }
  }
);

export const signin = () => {};

export const signout = () => {};

export const verifyJwt = () => {};

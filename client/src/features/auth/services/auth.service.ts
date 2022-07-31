import { DisplayUser } from "./../interfaces/display-user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { DecodedJwt } from "../interfaces/decoded-jwt.interface";
import { SigninUser } from "../interfaces/signin-user.interface";
import { SignupUserType } from "../types/signup-user.type";
import { JwtType } from "../types/jwt.type";

// ASYNC THUNKS
export const signup = createAsyncThunk(
  "auth/signup",
  async (userDetails: SignupUserType, thunkApi) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/signup`,
        userDetails
      );
      return data;
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   console.log(error.response.data.message);
      // }
      return thunkApi.rejectWithValue(`Failed to signup the user`);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (
    userDetails: SigninUser,
    thunkApi
  ): Promise<{ jwt: JwtType; user: DisplayUser | null }> => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/signin`,
      userDetails
    );

    // If the response has a JWT inside it
    // store it in the local storage
    if (data) {
      localStorage.setItem("jwt", JSON.stringify(data));

      // Extract the user, token iat, & token expiry from the JWT
      const decodedJwt: DecodedJwt = jwtDecode(data.token);
      localStorage.setItem("user", JSON.stringify(decodedJwt));
      return { jwt: data, user: decodedJwt.user };
    }

    return { jwt: data, user: null };
    // try {
    // } catch (error) {
    //   console.log(error);
    //   return thunkApi.rejectWithValue(`Failed to signin the user`);
    // }
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  console.log("signing out");
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
});

export const verifyJwt = createAsyncThunk(
  "auth/verify-jwt",
  async (jwt: string, thunkApi) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/verify-jwt`,
        { jwt }
      );

      if (!data) {
        return false;
      }

      const jwtExpiry = data.exp * 1000; // returns time in miliseconds
      return jwtExpiry > Date.now();
    } catch (error) {
      return thunkApi.rejectWithValue(`Failed to verify the user`);
    }
  }
);

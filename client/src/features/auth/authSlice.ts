import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { BaseAsyncState } from "./interfaces/base-async-state.interface";
import { DisplayUser } from "./interfaces/display-user.interface";
import { signup } from "./services/auth.service";
import { JwtType } from "./types/jwt.type";

interface InitialState extends BaseAsyncState {
  user?: DisplayUser | null;
  jwt?: JwtType | null;
  isAuthenticated?: boolean;
}

const initialState: InitialState = {
  user: null,
  jwt: null,
  isAuthenticated: false,
  loading: false,
  success: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // SYNCHRONOUS REDUCERS
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  // A-SYNCHRONOUS REDUCERS
  extraReducers: (builder) => {
    builder
      // SIGNUP USER
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.user = null;
      });
  },
});

// SELECTORS
export const selectedUser = (state: RootState) => state.auth;

export const { reset } = authSlice.actions;
export default authSlice.reducer;

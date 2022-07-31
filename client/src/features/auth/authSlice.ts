import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { BaseAsyncState } from "./interfaces/base-async-state.interface";
import { DisplayUser } from "./interfaces/display-user.interface";
import { signup, signin, signout, verifyJwt } from "./services/auth.service";
import { JwtType } from "./types/jwt.type";

interface InitialState extends BaseAsyncState {
  user?: DisplayUser | null;
  jwt?: JwtType | null;
  isAuthenticated?: boolean;
}

const storedUser: string | null = localStorage.getItem("user");
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: JwtType | null = !!storedJwt ? JSON.parse(storedJwt) : null;

// const getItemsFromLocalStorage = (itemType: any) => {
//   const storedItem: string | null = localStorage.getItem(itemType);
//   const parsedItem = !!storedItem ? JSON.parse(storedItem) : null;
//   return parsedItem;
// };

const initialState: InitialState = {
  user,
  jwt,
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
      .addCase(signup.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.user = null;
      })
      // SIGNIN USER
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.jwt = action.payload.jwt;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(signin.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.user = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      // SIGNOUT USER
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })
      // VERIFY JWT
      .addCase(verifyJwt.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isAuthenticated = false;
      });
  },
});

// SELECTORS
export const selectedUser = (state: RootState) => state.auth.user;

export const { reset } = authSlice.actions;
export default authSlice.reducer;

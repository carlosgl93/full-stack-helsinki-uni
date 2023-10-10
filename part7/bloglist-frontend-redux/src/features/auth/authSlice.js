// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login, registerUser } from "../../services/auth";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
        success: true,
      };
    },
  },
  extraReducers: (builder) => {
    return {
      // register user
      [registerUser.pending]: (state) => {
        state.loading = true;
        state.error = null;
      },
      [registerUser.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      },
      [registerUser.rejected]: (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      },
      [login.pending]: (state) => {
        state.loading = true;
        state.error = null;
      },
      [login.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      },
      [login.rejected]: (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      },
    };
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

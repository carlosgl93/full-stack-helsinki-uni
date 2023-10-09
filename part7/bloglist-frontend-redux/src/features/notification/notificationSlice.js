import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: "",
  // severity ENUM: 'error' | 'warning' | 'info' | 'success
  severity: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return {
        ...action.payload,
        show: true,
      };
    },
    resetNotification: (state) => {
      return initialState;
    },
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

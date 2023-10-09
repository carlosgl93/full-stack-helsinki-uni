import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const notification = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification(text));
    setTimeout(() => {
      dispatch(removeNotification(time));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;

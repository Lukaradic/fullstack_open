import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.text = action.payload.text;
    },
    removeNotification(state) {
      state.text = "";
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const displayNotification = (content, time = 5) => {
  return (dispatch) => {
    dispatch(setNotification({ text: content }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 1000 * time);
  };
};

export default notificationSlice.reducer;

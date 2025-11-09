import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      //  set text to state
      //  remove text from state after 5 sec
      const { payload } = action;
      const { text } = payload;
      console.log(text);
      state.text = text;
    },
    removeNotification(state) {
      state.text = "";
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const displayNotification = (text) => (dispatch) => {
  dispatch(setNotification({ text }));
  setTimeout(() => {
    dispatch(removeNotification());
  }, 5000);
};

export default notificationSlice.reducer;

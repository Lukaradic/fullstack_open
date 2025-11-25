import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  type: '',
};
export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { content, type } = action.payload;
      state.content = content;
      state.type = type;
    },
    clearNotification: (state) => {
      return {
        ...state,
        content: '',
        type: '',
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const displayNotification = (type, content, time = 5) => {
  return (dispatch) => {
    dispatch(setNotification({ content, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 1000 * time);
  };
};

export default notificationSlice.reducer;

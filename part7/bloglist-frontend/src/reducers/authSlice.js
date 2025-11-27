import { createSlice } from '@reduxjs/toolkit';

const setTokenToStorage = (token, userData) => {
  localStorage.setItem('userToken', token);
  localStorage.setItem('userData', JSON.stringify(userData));
};

const removeUserFromStorage = () => {
  localStorage.removeItem('userData');
  localStorage.removeItem('userToken');
};

const getTokenFromStorage = () => {
  return localStorage.getItem('userToken');
};

const getUserFromStorage = () => {
  return localStorage.getItem('userData');
};

const initialState = {
  user: null,
  tokne: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.tokne = token;
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const setUserData = (user, token) => {
  return (dispatch) => {
    setTokenToStorage(token, user);
    dispatch(logIn({ user, token }));
  };
};

export const removeUserData = () => {
  return (dispatch) => {
    removeUserFromStorage();
    dispatch(logOut());
  };
};

export const checkStorageForUserData = () => {
  return (dispatch) => {
    const token = getTokenFromStorage();
    const user = getUserFromStorage();

    if (user && token) {
      const userData = JSON.parse(user);
      dispatch(logIn({ user: userData, token }));
    }
  };
};
export default authSlice.reducer;

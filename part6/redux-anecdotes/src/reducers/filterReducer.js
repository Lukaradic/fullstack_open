import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    applyTerm(state, action) {
      const { payload } = action;
      return {
        ...state,
        term: payload,
      };
    },
  },
});

export const { applyTerm } = filterSlice.actions;
export default filterSlice.reducer;

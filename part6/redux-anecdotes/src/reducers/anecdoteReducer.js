import { createSlice } from "@reduxjs/toolkit";
import {
  getAnecdotes,
  createAnecdote,
  voteForAnecdote,
} from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    set(_, action) {
      const { data } = action.payload;
      const sorted = [...data].sort((a, b) => b.votes - a.votes);
      return sorted;
    },
    vote(state, action) {
      const { payload } = action;
      const { id } = payload;

      const aneecdote = state.find((el) => el.id === id);
      aneecdote.votes++;
      state.sort((a, b) => b.votes - a.votes);
    },
    add(state, action) {
      const { payload } = action;
      const { anecdote } = payload;
      state.push(anecdote);
    },
  },
});

export const { vote, add, set } = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes();
    dispatch(set({ data: anecdotes }));
  };
};

export const createAnecdoteAction = (content) => {
  return async (dispatch) => {
    const anecdote = await createAnecdote(content);
    dispatch(add({ anecdote }));
  };
};

export const voteAnecdoteAction = (id, voteNumber) => {
  return async (dispatch) => {
    const res = await voteForAnecdote(id, voteNumber);
    dispatch(vote({ id: res.id }));
  };
};

export default anecdotesSlice.reducer;

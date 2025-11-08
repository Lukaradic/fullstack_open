import React from "react";
import { useStore } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
  const store = useStore();

  const add = (e) => {
    e.preventDefault();
    const input = document.getElementById("anecdote");
    store.dispatch(createAnecdote(input.value));
    input.value = "";
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input type="text" id="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

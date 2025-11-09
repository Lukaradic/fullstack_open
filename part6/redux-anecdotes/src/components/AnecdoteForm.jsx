import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    const input = document.getElementById("anecdote");
    dispatch(add({ anecdote: input.value }));
    dispatch(displayNotification(`You created: ${input.value}`));
    input.value = "";
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          <input type="text" id="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

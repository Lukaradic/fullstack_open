import React from "react";
import { useDispatch } from "react-redux";
import { displayNotification } from "../reducers/notificationReducer";
import { createAnecdoteAction } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      const input = document.getElementById("anecdote");
      const content = input.value;
      dispatch(createAnecdoteAction(content));
      dispatch(displayNotification(`You created: ${content}`));
      input.value = "";
    } catch (err) {
      console.error(err);
    }
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

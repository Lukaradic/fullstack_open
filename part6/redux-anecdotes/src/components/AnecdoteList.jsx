import React from "react";

import { useSelector, useStore } from "react-redux";
export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const store = useStore();

  const vote = (id) => {
    store.dispatch({ type: "VOTE", payload: { id } });
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

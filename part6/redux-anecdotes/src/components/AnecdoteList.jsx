import React, { useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Filter } from "./Filter";
import { vote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const handleVote = (id, content) => {
    dispatch(vote({ id }));
    dispatch(displayNotification(`You voted for: ${content}`));
  };

  const filteredAnecodtes = useMemo(() => {
    if (!filter) {
      return anecdotes;
    }

    const cloned = [...anecdotes];

    return cloned.filter((el) =>
      el.content.toLowerCase().includes(filter.term.toLowerCase())
    );
  }, [anecdotes, filter]);

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {filteredAnecodtes.map((anecdote) => (
        <div key={anecdote.id} style={{ padding: 12, marginBottom: 8 }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

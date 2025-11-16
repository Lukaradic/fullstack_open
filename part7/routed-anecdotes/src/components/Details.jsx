import { useParams } from "react-router-dom";

export const Details = ({ anecdotes }) => {
  const params = useParams();

  const anecdote = anecdotes.find((a) => a.id === Number(params.id));

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  );
};

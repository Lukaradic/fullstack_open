export const DisplayAnecdote = ({ anecdote, handleVote, handleNext }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <div>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>
    </div>
  );
};

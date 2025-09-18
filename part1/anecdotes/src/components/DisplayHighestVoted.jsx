export const DisplayHighestVoted = ({ anecdotes, votes }) => {
  const getHighestVoted = () => {
    let max = 0;
    let currentIndex = 0;
    votes.forEach((vote, i) => {
      if (vote > max) {
        max = vote;
        currentIndex = i;
      }
    });

    if (max === 0) {
      return -1;
    }
    return currentIndex;
  };

  return <p>{anecdotes[getHighestVoted()]}</p>;
};

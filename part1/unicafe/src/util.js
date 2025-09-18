export const calculateAverage = (good, bad, total) => {
  return (good - bad) / total;
};

export const calculatePositivePercentage = (total, good) => {
  return (good * 100) / total;
};

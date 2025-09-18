import { calculateAverage, calculatePositivePercentage } from "../util";
import { StatisticsLine } from "./StatisticsLine";

export const Statistics = ({ feedbacks }) => {
  const { good, bad, neutral } = feedbacks;
  const total = good + bad + neutral;

  return (
    <div>
      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={total} />
            <StatisticsLine
              text="average"
              value={calculateAverage(good, bad, total)}
            />
            <StatisticsLine
              text="percentage"
              value={calculatePositivePercentage(total, good)}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

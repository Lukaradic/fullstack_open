import { useState } from "react";
import { Statistics } from "./components/Statistics";
import { Feedback } from "./components/Feedback";

const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedbackClick = (feedback) => {
    const cloned = { ...feedbacks };
    cloned[feedback]++;
    setFeedbacks(cloned);
  };

  return (
    <div>
      <Feedback onClick={handleFeedbackClick} />
      <Statistics feedbacks={feedbacks} />
    </div>
  );
};

export default App;

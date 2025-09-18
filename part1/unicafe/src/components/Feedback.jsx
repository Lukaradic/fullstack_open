export const Feedback = ({ onClick }) => {
  const feedbackTypes = ["good", "neutral", "bad"];
  return (
    <div>
      <h1>Give Feedback</h1>
      <div className="container" style={{ display: "flex", gap: 4 }}>
        {feedbackTypes.map((type) => (
          <button key={type} onClick={() => onClick(type)}>
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

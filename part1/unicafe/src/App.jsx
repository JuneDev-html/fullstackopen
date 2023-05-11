import React from "react";

function App() {
  const [feedback, setFeedback] = React.useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = (name) => {
    setFeedback((prev) => {
      return {
        ...prev,
        [name]: prev[name] + 1,
      };
    });
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleClick("good")}>good</button>
      <button onClick={() => handleClick("neutral")}>neutral</button>
      <button onClick={() => handleClick("bad")}>bad</button>
      <h1>statistics</h1>
      <table>
        <tr>
          <td>good</td>
          <td>{feedback.good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{feedback.neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{feedback.bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{feedback.bad + feedback.good + feedback.neutral}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(feedback.bad + feedback.good + feedback.neutral) / 3}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>
            {(feedback.good /
              (feedback.bad + feedback.good + feedback.neutral)) *
              100}
            %
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;

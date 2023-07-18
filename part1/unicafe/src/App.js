import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(good + neutral + bad);
  const [average, setAverage] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
    const newAverage = (good + 1 - bad) / (total + 1);
    setAverage(newAverage);
    const newPositivePercentage = ((good + 1) / (total + 1)) * 100;
    setPositivePercentage(newPositivePercentage);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    const newAverage = (good - bad) / (total + 1);
    setAverage(newAverage);
    const newPositivePercentage = (good / (total + 1)) * 100;
    setPositivePercentage(newPositivePercentage);
  };
  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    const newAverage = (good - (bad + 1)) / (total + 1);
    setAverage(newAverage);
    const newPositivePercentage = (good / (total + 1)) * 100;
    setPositivePercentage(newPositivePercentage);
  };

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <div>
          <Button handleClick={handleGood} text="good" />
          <Button handleClick={handleNeutral} text={"neutral"} />
          <Button handleClick={handleBad} text={"bad"} />
        </div>
        <Statistics
          average={average}
          bad={bad}
          good={good}
          neutral={neutral}
          positivePercentage={positivePercentage}
          total={total}
        />
      </div>
    </>
  );
};

export default App;

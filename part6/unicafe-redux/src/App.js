import { good, bad, ok, reset } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state);

  const handleGood = () => dispatch(good());
  const handleOk = () => dispatch(ok());
  const handleBad = () => dispatch(bad());
  const handleReset = () => dispatch(reset());

  return (
    <div>
      <button onClick={() => handleGood()}>good</button>
      <button onClick={() => handleOk()}>ok</button>
      <button onClick={() => handleBad()}>bad</button>
      <button onClick={() => handleReset()}>reset stats</button>
      <div>good {reviews.good}</div>
      <div>ok {reviews.ok}</div>
      <div>bad {reviews.bad}</div>
    </div>
  );
};

export default App;

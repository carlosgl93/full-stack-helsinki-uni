import "./App.css";
import { Nav } from "./components";
import { Router } from "./views/Routes";

export const App = () => {
  return (
    <>
      <Nav />
      <Router />
    </>
  );
};

export default App;

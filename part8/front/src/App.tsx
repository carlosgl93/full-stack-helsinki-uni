import "./App.css";
import { Nav } from "./components";
import { Router } from "./views/Routes";

export const App = () => {
  return (
    <>
      <Nav />
      <main>
      <Router />
        
      </main>
    </>
  );
};

export default App;

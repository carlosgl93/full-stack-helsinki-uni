import { Route, Routes } from "react-router";
import { Home } from "./Home";
import Authors from "./Authors";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

import { Route, Routes } from "react-router";
import { Home } from "./Home";
import Authors from "./Authors";
import { Books } from "../components/Books";
import { SignIn } from "./SignIn";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/books" element={<Books />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

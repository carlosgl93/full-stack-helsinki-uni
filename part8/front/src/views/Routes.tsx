import { Route, Routes } from "react-router";
import { Home, Authors, Books, SignIn} from '.'

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

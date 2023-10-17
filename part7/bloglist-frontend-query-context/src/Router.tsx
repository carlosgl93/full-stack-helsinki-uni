import { Route, Routes } from "react-router-dom";
import { User, Users, Home, Blogs } from "./views";
import { BlogView } from "./views/BlogView";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users" element={<Users />} />
    <Route path="/blogs" element={<Blogs />} />

    <Route path="/users/:id" element={<User />} />
    <Route path="/blog/:id" element={<BlogView />} />
  </Routes>
);

export default Router;

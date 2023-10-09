import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Signup, Login, Blogs } from ".";
import { Blog } from "../components";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/signup" element={<Signup />} />
    <Route path="/blogs/:blogId" element={<Blog />} />
    <Route path="/blogs" element={<Blogs />} />
  </Routes>
);

export default Router;

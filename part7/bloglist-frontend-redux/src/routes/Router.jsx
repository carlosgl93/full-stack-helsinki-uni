import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Signup, Login, Blogs, Blog, Profile } from ".";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/signup" element={<Signup />} />
    <Route path="/blogs/:blogId" element={<Blog />} />
    <Route path="/blogs" element={<Blogs />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default Router;

import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Blogs } from "./Blogs";
import { BlogForm } from "../components";

export const Home = () => {
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();
  const { userInfo } = useSelector((state) => state.auth);

  console.log({ userInfo });

  const handleLikeBlog = async (blog) => {
    try {
      await blogService.likeBlog(blog);
      setNotification({
        color: "blue",
        message: "Blog liked",
      });
    } catch (error) {
      console.log(error);
      setNotification({
        color: "error",
        message: error.message,
      });
    }
  };

  const handleCreateBlog = async (e, title, url) => {
    e.preventDefault();
    if (!title || !url) return;
    const newBlog = {
      title,
      url,
    };
    try {
      const blogCreated = await blogService.create(newBlog);
      setNotification(() => ({
        color: "green",
        message: `New blog created: ${blogCreated.title}`,
      }));
    } catch (error) {
      console.log(error);
      setNotification(() => ({
        color: "red",
        message: `error creating the blog: ${error.message}`,
      }));
    }
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      {userInfo ? (
        <>
          <BlogForm />
          <Blogs />
        </>
      ) : (
        <Link to="auth/login">Login</Link>
      )}
    </div>
  );
};

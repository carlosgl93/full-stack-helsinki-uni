import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetNotification,
  setNotification,
} from "../features/notification/notificationSlice";
import { useCreateBlogMutation } from "../features/blogs/blogs";
import { useNavigate } from "react-router";

export const BlogFormController = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createBlog, { error, data, isSuccess }] = useCreateBlogMutation();

  const handleCreateBlog = async (e, title, url) => {
    e.preventDefault();
    if (!title || !url) return;
    const newBlog = {
      title,
      url,
    };
    console.log("new blog", newBlog);
    const blogCreated = await createBlog({
      blog: newBlog,
      token: userInfo.token,
    });
  };

  useEffect(() => {
    if (error) {
      dispatch(
        setNotification({
          severity: "error",
          message:
            "Error creating the blog, ensure the title and url are unique or try again later",
        }),
      );

      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    if (data && isSuccess) {
      console.log(data);
      dispatch(
        setNotification({
          severity: "success",
          message: "Blog created successfully, navigating...",
        }),
      );
      setTimeout(() => navigate(`/blogs/${data.id}`), 1000);
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  }, [data, isSuccess]);

  return {
    title,
    url,
    setTitle,
    setUrl,
    handleCreateBlog,
  };
};

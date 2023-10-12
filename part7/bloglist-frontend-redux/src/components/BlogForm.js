import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetNotification,
  setNotification,
} from "../features/notification/notificationSlice";
import { useCreateBlogMutation } from "../services/blogs";

export const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [createBlog, { isLoading, isError }] = useCreateBlogMutation();

  const handleCreateBlog = async (e, title, url) => {
    e.preventDefault();
    if (!title || !url) return;
    const newBlog = {
      title,
      url,
    };
    console.log("new blog", newBlog);
    try {
      const blogCreated = await createBlog({
        blog: newBlog,
        token: userInfo.token,
      });
      dispatch(
        setNotification(() => ({
          severity: "success",
          message: `New blog created: ${blogCreated.title}`,
        })),
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setNotification(() => ({
          severity: "error",
          message: `Error creating the blog: ${error.message}`,
        })),
      );
    }
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={(e) => handleCreateBlog(e, title, url)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="titleInput"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input
            id="urlInput"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit" id="submitButton">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

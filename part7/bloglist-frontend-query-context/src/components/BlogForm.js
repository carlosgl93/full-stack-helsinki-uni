import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UiContext } from "../state/ui";
import { useContext, useState } from "react";
import { createBlog } from "../services/blogs";
import { AuthContext } from "../state/auth";

export const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const { toggleToast } = useContext(UiContext);
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blogs"]);
      toggleToast("SUCCESS", "Blog created successfully");
      setTitle("");
      setUrl("");
    },
    onError: (error) => {
      toggleToast(
        "ERROR",
        `Oops, something went wrong, please try again. ${error}`,
      );
    },
  });

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!title || !url) return;
    const newBlog = {
      title,
      url,
    };
    newBlogMutation.mutate({ newBlog, userToken: user.token });
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

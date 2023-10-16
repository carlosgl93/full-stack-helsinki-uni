import { useContext, useState } from "react";
import blogService from "../../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../state/auth";
import { SEVERITY, UiContext } from "../../state/ui";

export const Blog = ({ blog, userId, handleLike, setNotification }) => {
  const [view, setView] = useState(false);

  const { user } = useContext(AuthContext);
  const { toggleToast } = useContext(UiContext);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: "5px",
    borderColor: "#3C7A89",
  };

  const { likeBlog, deleteBlog } = blogService;

  const queryClient = useQueryClient();

  const { isLoading, mutate, error, data } = useMutation({
    mutationFn: () => likeBlog(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteBlog(blog.id, user.token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
      toggleToast(SEVERITY.SUCCESS, "Blog deleted");
    },
  });

  const handleView = () => setView(!view);

  const handleDelete = (blog) => deleteMutation.mutate(blog.id);

  const handleLikeBlog = (blog) => mutate(blog);

  return (
    <div style={blogStyle} className="blog">
      <h4
        style={{
          margin: "0.25rem",
        }}
      >
        {blog.title}
        <span>
          <button onClick={handleView} className="viewButton">
            {view ? "Hide" : "View"}
          </button>
        </span>
      </h4>
      <p id="author">By: {blog.author}</p>

      {view && (
        <div className="blogInfo" data-cy="blogInfo">
          <p id="url">{blog.url}</p>
          <p id="likes" className="blogLikes">
            Likes: {blog.likes}
            {isLoading ? (
              <span>
                <p>Loading...</p>
              </span>
            ) : (
              <button
                id="likeButton"
                className="likeCTA"
                onClick={() => handleLikeBlog(blog)}
              >
                Like
              </button>
            )}
          </p>
          <p>By: {blog.author}</p>
          {blog.user === user.id && (
            <button id="deleteButton" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

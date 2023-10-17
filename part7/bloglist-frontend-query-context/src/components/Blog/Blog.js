import { useContext } from "react";
import blogService from "../../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../state/auth";
import { SEVERITY, UiContext } from "../../state/ui";
import { Link } from "react-router-dom";

export const Blog = ({ blog }) => {
  const { user } = useContext(AuthContext);
  const { toggleToast } = useContext(UiContext);
  const queryClient = useQueryClient();

  const { isLoading, mutate, error, data } = useMutation({
    mutationFn: () => likeBlog(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });

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

  const deleteMutation = useMutation({
    mutationFn: () => deleteBlog(blog.id, user.token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
      toggleToast(SEVERITY.SUCCESS, "Blog deleted");
    },
  });

  const handleDelete = (blog) => deleteMutation.mutate(blog.id);

  const handleLikeBlog = (blog) => mutate(blog);

  const { id, title, url, author, likes } = blog;

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blog/${id}`}>
        <h4
          style={{
            margin: "0.25rem",
          }}
        >
          {title}
        </h4>
      </Link>
      <p id="author">By: {author}</p>

      <div className="blogInfo" data-cy="blogInfo">
        <p id="url">{url}</p>
        <p id="likes" className="blogLikes">
          Likes: {likes}
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <button
              id="likeButton"
              className="likeCTA"
              onClick={() =>
                handleLikeBlog({
                  id,
                  title,
                  author,
                  likes,
                  url,
                })
              }
            >
              Like
            </button>
          )}
        </p>
        <p>By: {author}</p>
        {blog.user === user?.id && (
          <button id="deleteButton" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

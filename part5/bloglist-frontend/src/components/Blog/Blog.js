import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../../services/blogs";

export const Blog = ({ blog, userId, handleLike, setNotification }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleView = () => setView(!view);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this post?"
    );
    console.log(confirmation);
    if (confirmation) {
      try {
        await blogService.deleteBlog(blog.id);
        setTimeout(() => {
          setNotification({
            color: "green",
            message: "blog deleted successfully",
          });
        }, 5000);
      } catch (error) {
        console.log(error);

        setTimeout(() => {
          setNotification({
            color: "red",
            message: error.message,
          });
        }, 5000);
      }
    }
  };

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
        <div className="blogInfo">
          <p id="url">{blog.url}</p>
          <p id="likes" className="blogLikes">
            Likes: {blog.likes}
            <span>
              <button
                id="likeButton"
                className="likeCTA"
                onClick={() => handleLike(blog)}
              >
                Like
              </button>
            </span>
          </p>
          <p>By: {blog.author}</p>
          {blog.user === userId && (
            <button id="deleteButton" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import blogService from "../../services/blogs";
import {
  useGetBlogQuery,
  useLikeBlogMutation,
} from "../../features/blogs/blogs";

export const BlogCard = ({ blog, userId, setNotification }) => {
  console.log("BLOG PROP", blog);

  const [view, setView] = useState(true);
  const [updatedBlog, setUpdatedBlog] = useState(blog);
  const {
    data: blogData,
    error: blogError,
    isLoading: blogLoading,
  } = useGetBlogQuery(blog.id, blog.user);

  console.log("BLOG DATA QUJERY", blogData);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [likeBlog, { error, data, isSuccess, isLoading }] =
    useLikeBlogMutation();

  const handleLike = async (blog) => {
    await likeBlog(blog);
    setUpdatedBlog(() => data);
  };
  console.log("UPDATED BLOG", data);

  const handleView = () => setView(!view);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this post?",
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
        <div className="blogInfo" data-cy="blogInfo">
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

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   handleLike: PropTypes.func.isRequired,
//   userId: PropTypes.string.isRequired,
// };

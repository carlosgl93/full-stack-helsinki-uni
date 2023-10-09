import { useState, useEffect } from "react";
import { Blog, Login, BlogForm, Togglable } from "./components";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();

  useEffect(() => {
    console.log("triggering first useEffect");
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, [notification]);

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userBlogApp");
    if (userLocalStorage) {
      const userParsed = JSON.parse(userLocalStorage);
      setUser(userParsed);
      blogService.setToken(userParsed.token);
    }
  }, []);

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
      <h2>Blogs</h2>

      {!user && (
        <Togglable toggleLabel="Log in">
          <Login setUser={setUser} setNotification={setNotification} />
        </Togglable>
      )}
      {user && <h5>{user.name}, read or create a blog!</h5>}

      {user && (
        <button
          id="logout"
          onClick={() => {
            window.localStorage.removeItem("userBlogApp");
            setUser(null);
          }}
        >
          Sign out
        </button>
      )}

      {notification && (
        <h2
          className="notification"
          style={{ backgroundColor: notification.color }}
        >
          {notification.message}
        </h2>
      )}

      {user && (
        <Togglable toggleLabel="Create a blog">
          <BlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>
      )}
      <div>
        <h2>Blog List</h2>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            userId={user && user.id}
            blog={blog}
            handleLike={handleLikeBlog}
            setNotification={setNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

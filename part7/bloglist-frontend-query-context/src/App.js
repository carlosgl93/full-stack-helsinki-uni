import { useState, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Blog, Login, BlogForm, Togglable } from "./components";
import { createBlog, getAll } from "./services/blogs";
import { AuthContext } from "./state/auth";
import { Toast } from "./components/Toast";
import { UiContext } from "./state/ui";
import "./styles/App.css";

const App = () => {
  const [notification, setNotification] = useState();
  const { user, logoutUser } = useContext(AuthContext);
  const { toast } = useContext(UiContext);
  console.log("TOAST", toast);

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
  });

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
      const result = newBlogMutation.mutate(newBlog);
      console.log(result);
      // const blogCreated = await blogService.create(newBlog);
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
      {toast && <Toast />}

      <h2>Blogs</h2>

      {!user && (
        <Togglable toggleLabel="Log in">
          <Login setNotification={setNotification} />
        </Togglable>
      )}
      {user && <h5>{user.name}, read or create a blog!</h5>}

      {user && (
        <button id="logout" onClick={logoutUser}>
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

        {isLoading && <p>Loading...</p>}

        {data?.map((blog) => (
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

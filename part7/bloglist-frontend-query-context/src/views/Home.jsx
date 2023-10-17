import React from "react";
import { useState, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Blog, Login, BlogForm, Togglable } from "../components";
import { getAll } from "../services/blogs";
import { AuthContext } from "../state/auth";
import { Toast } from "../components/Toast";
import { UiContext } from "../state/ui";

export const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { toast } = useContext(UiContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
  });

  console.log(data);

  return (
    <div>
      {toast && <Toast />}

      <h2>Blogs</h2>

      {!user && (
        <Togglable toggleLabel="Log in">
          <Login />
        </Togglable>
      )}
      {user && <h5>{user.name}, read or create a blog!</h5>}

      {user && (
        <button id="logout" onClick={logoutUser}>
          Sign out
        </button>
      )}

      {user && (
        <Togglable toggleLabel="Create a blog">
          <BlogForm />
        </Togglable>
      )}
      <div>
        <h2>Blog List</h2>

        {isLoading && <p>Loading...</p>}

        {data &&
          data.map((blog) => (
            <Blog key={blog.id} userId={user && user.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

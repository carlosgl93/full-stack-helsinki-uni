import React from "react";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { flexColumn } from "../styled";
import { LOGIN } from "../queries";

export const Login = ({ setToken, setError, show, setPage }) => {
  const [loginUser, result] = useMutation(LOGIN);

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      loginUser({
        variables: {
          username,
          password
        }
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setPage("authors");
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={onSubmit} style={flexColumn}>
      <label htmlFor="username">Username</label>
      <input placeholder="Enter your username" type="text" name="username" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder="******" />
      <button type="submit">Login</button>
    </form>
  );
};

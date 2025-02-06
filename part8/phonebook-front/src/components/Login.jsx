import React from "react";
import { useMutation } from "@apollo/client";
import { flexColumnStyle } from "./addPerson";
import { LOGIN } from "../mutations";
import { useEffect } from "react";

export const Login = ({ setToken, setError }) => {
  const [loginUser, result] = useMutation(LOGIN);

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const { data } = await loginUser({
        variables: {
          username,
          password
        }
      });
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]);

  return (
    <form onSubmit={onSubmit} style={flexColumnStyle}>
      <label htmlFor="username">Username</label>
      <input placeholder="Enter your username" type="text" name="username" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder="******" />
      <button type="submit">Login</button>
    </form>
  );
};

import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/login";

export const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      loginMutation.mutate({ email, password });

      setUser(result);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("error login in", error);
      setErrorMessage("Credentials not found, check email or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h3>Login</h3>

      {errorMessage && (
        <div
          style={{
            backgroundColor: "red",
          }}
        >
          <h4>{errorMessage}</h4>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </div>
        <div>
          <button id="login-submit" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

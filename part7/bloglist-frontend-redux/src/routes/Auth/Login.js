import { useState } from "react";
import loginService from "../../services/login";
import blogService from "../../services/blogs";
import { registerUser, useLoginQuery } from "../../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
// import { Link as RouterLink } from "react-router";

export const Login = ({ setUser }) => {
  // const { data: user, error, isLoading } = useLoginQuery();
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const result = await loginService.login({ username, password });
      const result = dispatch(registerUser({ username, password }));
      // blogService.setToken(result.token);

      // window.localStorage.setItem("userBlogApp", JSON.stringify(result));

      setUser(result);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("error login in", error);
      setErrorMessage("Credentials not found, check username or password");
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
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
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
      <div>
        <h3>Dont have an account yet?</h3>
        <Link component={RouterLink} to="/auth/signup">
          Register here
        </Link>
      </div>
    </div>
  );
};

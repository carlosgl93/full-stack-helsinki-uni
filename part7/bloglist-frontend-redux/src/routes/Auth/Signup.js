import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { registerUser, useLoginQuery } from "../../services/auth";
import {
  resetNotification,
  setNotification,
} from "../../features/notification/notificationSlice";
export const Signup = ({ setUser }) => {
  // const { data: user, error, isLoading } = useLoginQuery();
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords dont match");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }
    try {
      const result = await dispatch(
        registerUser({ firstname: name, email, password }),
      );

      console.log(result);
      const error = result?.error;
      const { data, status } = result.payload;
      console.log(error, data, status);

      if (error) throw new Error(error.message);

      if (status === 201) {
        setName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        dispatch(
          setNotification({
            message: data.message,
            severity: "success",
          }),
        );
        setTimeout(() => {
          dispatch(resetNotification());
        }, 5000);
      }
    } catch (error) {
      console.log("error login in", error);
      dispatch(
        setNotification({
          message: error.message,
          severity: "error",
        }),
      );
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  };

  return (
    <div>
      <h3>Register</h3>

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
          <label htmlFor="username">Name:</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={({ target }) => setName(target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
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
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={({ target }) => setConfirmPassword(target.value)}
            value={confirmPassword}
          />
        </div>
        <div>
          <button id="login-submit" type="submit">
            Register
          </button>
        </div>
      </form>
      <div>
        <h3>Already have an account?</h3>
        <Link component={RouterLink} to="/auth/login">
          Login here
        </Link>
      </div>
    </div>
  );
};

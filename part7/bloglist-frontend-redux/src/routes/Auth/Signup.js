import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

import { SignupController } from "./SignupController";
export const Signup = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  } = SignupController();

  return (
    <div>
      <h3>Register</h3>

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
          <button
            id="login-submit"
            type="submit"
            disabled={!name || !email || !password || !confirmPassword}
          >
            {!name || !email || !password || !confirmPassword
              ? "Enter your information"
              : "Register"}
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

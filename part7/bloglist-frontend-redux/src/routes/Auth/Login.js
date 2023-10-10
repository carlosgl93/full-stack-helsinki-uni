import { Link as RouterLink } from "react-router-dom";
import { Alert, Link } from "@mui/material";

import { LoginController } from "./LoginController";

export const Login = () => {
  const { loading, handleSubmit, email, setEmail, password, setPassword } =
    LoginController();

  return (
    <div>
      <h3>Login</h3>

      {loading && <Alert severity="info">Loading...</Alert>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email:</label>
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
          <button
            id="login-submit"
            type="submit"
            disabled={!email || !password}
          >
            {!email || !password ? "Enter your credentials" : "Login"}
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

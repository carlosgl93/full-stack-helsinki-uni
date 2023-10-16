import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/login";
import { AuthContext } from "../state/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, updateUserState } = useContext(AuthContext);

  console.log(user);
  const loginMutation = useMutation({
    mutationFn: async (email, password) => await login(email, password),
    onSuccess: (data) => updateUserState(data),
  });

  console.log(loginMutation);
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      loginMutation.mutate({ email, password });
      if (loginMutation.isSuccess) {
        // updateUserState(loginMutation.data);
        setEmail("");
        setPassword("");
      }
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

      {loginMutation.isLoading ? (
        <p>Loading...</p>
      ) : (
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
            <button
              id="login-submit"
              type="submit"
              disabled={!email || !password}
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

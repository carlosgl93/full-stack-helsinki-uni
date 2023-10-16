import LoginController from "./LoginController";

export const Login = () => {
  const {
    email,
    password,
    handleSubmit,
    data,
    isLoading,
    setEmail,
    setPassword,
  } = LoginController();

  return (
    <div>
      <h3>Login</h3>

      {isLoading ? (
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

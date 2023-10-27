import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../state/Context";
import "../styles/nav.css";

export const Nav = () => {
  const { user, logout } = useContext(Context);
  const handleLogout = () => logout()

  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/authors'}>Authors</Link>
        </li>
        <li>
          <Link to={'/books'}>Books</Link>
        </li>
        {user && (
          <li>
            <Link to={'/recommended'}>Recommended</Link>
          </li>
        )}

        <li>
          {user ? (
            <Link to={'/signin'} onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to={'/signin'}>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

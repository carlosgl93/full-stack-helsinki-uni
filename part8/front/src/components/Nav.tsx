import { Link } from "react-router-dom";
import "../styles/nav.css";

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/authors"}>Authors</Link>
        </li>
        <li>
          <Link to={"/books"}>Books</Link>
        </li>
      </ul>
    </nav>
  );
};

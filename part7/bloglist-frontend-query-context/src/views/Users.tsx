import { Link } from "react-router-dom";
import { getAllUsers } from "../services/users";
import { useQuery } from "@tanstack/react-query";

export const Users = () => {
  const { isLoading, data, error } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>There was an error fetching errors</p>;

  console.log(data);

  return (
    <div>
      <header>Users</header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ email, name, blogs, id }) => (
            <tr key={email}>
              <td>
                <Link to={`${id}`}>{name}</Link>
              </td>
              <td>{blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

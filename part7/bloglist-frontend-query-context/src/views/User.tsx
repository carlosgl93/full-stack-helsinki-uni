import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { User as UserType } from "@src/types";

export const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const users: UserType[] = queryClient.getQueryData(["users"]);

  if (!users) return <>No users!</>;

  const { name, blogs } = users.find((u) => u.id === id);

  if (!name) {
    navigate("/");
  }

  return (
    <div>
      <header>
        <h3>{name}</h3>
      </header>
      <section>
        <h4>Blogs from {name}</h4>
        <ul>
          {blogs.map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

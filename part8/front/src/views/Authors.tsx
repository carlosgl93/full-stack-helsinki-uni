import { FC, useState } from "react";
import { useQuery } from "@apollo/client";

import Author from "../components/Author";
import { AuthorForm } from "../components/AuthorForm";
import { Author as AuthorType } from "../types";
import { FIND_AUTHOR } from "../graphql/queries/findAuthor";
import { ALL_AUTHORS } from "../graphql";

type AuthorsProps = {};

export const Authors: FC<AuthorsProps> = () => {
  const [name, setName] = useState("");
  const [editedAuthor, setEditedAuthor] = useState<null | AuthorType>(null);
  const authorsResult = useQuery(ALL_AUTHORS);

  const result = useQuery(FIND_AUTHOR, {
    variables: {
      name,
    },
    skip: !name,
  });

  if (name && result.data) {
    return <Author author={result.data.findAuthorByName} onClose={setName} />;
  }

  if (result.loading || authorsResult.loading) {
    return <p>Loading...</p>;
  }

  if (result.error || authorsResult.error) {
    return <p>Oops, there was an error</p>;
  }

  return (
    <div>
      <h1>Authors</h1>
      <div>
        {editedAuthor && (
          <AuthorForm author={editedAuthor} setEditedAuthor={setEditedAuthor} />
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Born</th>
              <th>Number of books</th>
            </tr>
          </thead>
          <tbody>
            {authorsResult.data.allAuthors.map((a: AuthorType) => (
              <tr key={a.id + a.name} onClick={() => setEditedAuthor(() => a)}>
                <td>{a.name}</td>
                <td>{a?.born}</td>
                <td>{a.bookCount}</td>
                <td>
                  <button onClick={() => setName(a.name)}>Show books</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


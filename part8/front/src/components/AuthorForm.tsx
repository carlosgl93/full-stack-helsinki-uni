import React, { FC, useCallback, useState } from "react";
import { Author } from "../types";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../graphql";
import { EDIT_AUTHOR } from "../graphql/mutations/editAuthor";

type AuthorFormProps = {
  author: Author;
  setEditedAuthor: React.Dispatch<React.SetStateAction<Author | null>>;
};

export const AuthorForm: FC<AuthorFormProps> = ({
  author,
  setEditedAuthor,
}) => {
  const [year, setYear] = useState<null | string>(null);
  const { data, loading, error } = useQuery(ALL_AUTHORS);
  const [editAuthorMutation, mutationResult] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
      setEditedAuthor(null);
    },
    update: (cache, response) => {
      cache.updateQuery(
        {
          query: ALL_AUTHORS,
        },
        ({ allAuthors }) => {
          return {
            allAuthors: allAuthors.concat(response.data.editAuthor),
          };
        }
      );
    },
  });

  if (loading || mutationResult.loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oops, try again</p>;
  }

  const handleEditAuthor = (e: React.SyntheticEvent) => {
    e.preventDefault();
    editAuthorMutation({
      variables: {
        name: author.name,
        year: Number(year),
      },
    });
  };

  const handleSelectAuthor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAuthor = data.allAuthors.find(
      (a: Author) => a.name === e.target.value
    );
    setEditedAuthor(() => {
      return { ...newAuthor };
    });
  };

  return (
    <div>
      <h2>Edit Authors</h2>

      <select value={author.name} onChange={handleSelectAuthor}>
        {data.allAuthors.map((a: Author) => (
          <option key={a.id + a.name} value={a.name}>
            {a.name}
          </option>
        ))}
      </select>
      <form onSubmit={handleEditAuthor}>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>Year of birth:</td>
              <td>
                <input
                  type="number"
                  name="year"
                  id="year"
                  placeholder={author?.born}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setYear(e.target.value)
                  }
                />
              </td>
              <td>
                <button type="submit">Update!</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

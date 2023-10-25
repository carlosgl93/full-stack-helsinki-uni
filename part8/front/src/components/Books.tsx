import { FC, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../graphql";
import { Book as BookType } from "../types";
import { BookForm } from ".";

export const Books: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { data, loading, error } = useQuery(ALL_BOOKS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>/Oops something went wrong</p>;
  }

  if (data.allBooks) {
    console.log(data.allBooks);
    return (
      <>
        <header>
          <h1>Books</h1>
        </header>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "Add a book"}
        </button>

        {showForm && <BookForm setShowForm={setShowForm} />}

        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Born</td>
              <td>Published</td>
            </tr>
          </thead>
          <tbody>
            {data.allBooks.map((b: BookType) => (
              <tr key={b.id + b.title}>
                <td
                  style={{
                    textAlign: "start",
                  }}
                >
                  {b.title}
                </td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return <div></div>;
};

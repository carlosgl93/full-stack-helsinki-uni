import { useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ADD_BOOK } from "../queries";

const NewBook = ({ show, setPage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");
  const ref = useRef();

  const [createBook] = useMutation(ADD_BOOK, {
    onError: error => {
      setError(error.message);
    },
    onCompleted: () => {
      if (error.length === 0) {
        setPage("books");
      }
    },
    update: (cache, { data: { addBook } }) => {
      cache.modify({
        fields: {
          allBooks(existingBooks = []) {
            const newBookRef = cache.writeFragment({
              data: addBook,
              fragment: gql`
                fragment NewBook on Book {
                  id
                  title
                }
              `
            });
            return [...existingBooks, newBookRef];
          }
        }
      });
    }
  });

  const submit = async event => {
    event.preventDefault();
    await createBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres
      }
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    if (genre.trim() !== "") {
      setGenres(genres.concat(genre));
      setGenre("");
    }
  };

  useEffect(() => {
    if (error?.length) {
      ref?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start"
      });

      setTimeout(() => setError(""), 10000);
    }
  }, [error]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <div className="error" ref={ref}>
        {error}
      </div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

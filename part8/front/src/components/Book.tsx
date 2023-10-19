import { FC } from "react";
import { Book as BookType } from "../types";

type BookProps = {
  book: BookType;
};

const Book: FC<BookProps> = ({ book }) => {
  return (
    <article key={book.id}>
      <header>
        <h3>{book.title}</h3>
        {book.published && <p>Published in {book.published}</p>}
        {book.genres && <p>Genres: {book.genres.join(" - ").toUpperCase()}</p>}
      </header>
    </article>
  );
};

export default Book;

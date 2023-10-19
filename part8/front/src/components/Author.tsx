import { Author as AuthorType } from "../types";
import { Book as BookType } from "../types/Book";
import Book from "./Book";

type AuthorProps = {
  author: { author: AuthorType; books: BookType[] };
  onClose: React.Dispatch<React.SetStateAction<string>>;
};

const Author = (props: AuthorProps) => {
  const { author, books } = props.author;

  return (
    <div>
      <h1>{author.name}</h1>
      {books.map((b: BookType) => (
        <Book book={b} />
      ))}
      <button onClick={() => props.onClose("")}>Close</button>
    </div>
  );
};

export default Author;

import Author from "../models/Author";
import Book from "../models/Book";

export const addBook = async (root, args) => {
  const { title, author, genres, published } = args;
  if (
    await Book.findOne({
      title
    })
  ) {
    throw new GraphQLError("Title of the book must be unique", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: title
      }
    });
  }
  const foundAuthor = await Author.findOne({
    name: author
  });

  if (foundAuthor) {
    foundAuthor.bookCount = foundAuthor.bookCount ? foundAuthor.bookCount + 1 : 1;
    await foundAuthor.save();
    const newBook = new Book({ ...args, author: foundAuthor });
    await newBook.save();
    return newBook.populate("author");
  } else {
    const newAuthor = new Author({
      name: author,
      bookCount: 1
    });
    await newAuthor.save();
    const newBook = new Book({ ...args, author: newAuthor });
    await newBook.save();
    return newBook.populate("author");
  }
};

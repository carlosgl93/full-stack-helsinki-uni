const { GraphQLError } = require("graphql");
const Book = require("../models/books");
const Author = require("../models/authors");

const addBook = async (args) => {
  try {
    //   check if book arg is well formed
    let newBook = {
      ...args,
    };
    if (!newBook.title || !newBook.author) {
      throw new GraphQLError("Book parameters missing or malformed", {
        extensions: {
          code: "REQUEST_MALFORMED",
        },
      });
    }

    //   check if author exists
    const author = await Author.findOne({
      name: newBook.author,
    });

    //   if author exists:
    if (author) {
      //   append it to the newBook object
      newBook.author = author;
    } else {
      //   else create new author
      const newAuthor = new Author({
        name: newBook.author,
        bookCount: 1,
      });

      const resultAuthor = await newAuthor.save();
      console.log("resutltAuthor", resultAuthor);
      newBook.author = newAuthor;
    }
    //      save the new book
    const savedBook = new Book({ ...newBook });
    const result = await savedBook.save();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { addBook };

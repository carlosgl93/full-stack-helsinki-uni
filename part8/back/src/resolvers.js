const { addBook } = require("./mutations/addBook");
const { editAuthor } = require("./mutations/editAuthor");
const { allAuthors } = require("./queries/allAuthors");
const { allBooks } = require("./queries/allBooks");
const { authorCount } = require("./queries/authorCount");
const { bookCount } = require("./queries/bookCount");

const resolvers = {
  Query: {
    bookCount: () => bookCount(),
    authorCount: () => authorCount(),
    allBooks: (root, args) => allBooks(args),
    allAuthors: () => allAuthors(),
  },
  Mutation: {
    addBook: (root, args) => addBook(args),
    editAuthor: (root, args) => editAuthor(args),
  },
};

module.exports = { resolvers };

const { addBook } = require("./mutations/addBook");
const { createUser } = require("./mutations/createUser");
const { editAuthor } = require("./mutations/editAuthor");
const { login } = require("./mutations/login");
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
    me: (root, args, context) => me(context),
  },
  Mutation: {
    addBook: (root, args) => addBook(args),
    editAuthor: (root, args) => editAuthor(args),
    login: (root, args) => login(args),
    createUser: (root, args) => createUser(args),
  },
};

module.exports = { resolvers };

const { PubSub } = require('graphql-subscriptions')
const { addBook } = require("./mutations/addBook");
const { createUser } = require("./mutations/createUser");
const { editAuthor } = require("./mutations/editAuthor");
const { login } = require("./mutations/login");
const { setFavoriteGenre } = require("./mutations/setFavoriteGenre");
const { allAuthors } = require("./queries/allAuthors");
const { allBooks } = require("./queries/allBooks");
const { authorCount } = require("./queries/authorCount");
const { bookCount } = require("./queries/bookCount");
const { findAuthorByName } = require("./queries/findAuthorByName");
const { recommendedBooks } = require("./queries/recommendedBooks");

const pubsub = new PubSub()


const resolvers = {
  Query: {
    bookCount: () => bookCount(),
    authorCount: () => authorCount(),
    allBooks: (root, args) => allBooks(args),
    allAuthors: () => allAuthors(),
    findAuthorByName: (root, args) => findAuthorByName(args),
    me: (root, args, context) => me(context),
    recommendedBooks: (root, args) => recommendedBooks(args)
  },
  Mutation: {
    addBook: (root, args) => addBook(args),
    editAuthor: (root, args) => editAuthor(args),
    login: (root, args) => login(args),
    createUser: (root, args) => createUser(args),
    setFavoriteGenre: (root, args, context) => setFavoriteGenre(args, context)
  },
  Subscription: {
    addBook: {
      subscribe: () => pubsub.asyncIterator('ADD_BOOK')
    },
  },
};

module.exports = { resolvers };

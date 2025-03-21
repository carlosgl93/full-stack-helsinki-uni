const { GraphQLError } = require("graphql");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => {
      const bookCount = await Book.countDocuments();
      return bookCount;
    },
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filter.author = author._id;
        } else {
          throw new UserInputError("That author does not exist");
        }
      }

      if (args.genre) {
        filter.genres = args.genre;
      }

      return Book.find(filter).populate("author");
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
    me: async (root, args, ctx) => {
      return ctx.currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args, ctx) => {
      if (!ctx.currentUser) {
        throw new ForbiddenGQLError();
      }
      const { title, author } = args;
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
      try {
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
          newBook.populate("author");
          pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
          return newBook;
        }
      } catch (error) {
        throw new GraphQLError("book title or artist too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error
          }
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new ForbiddenGQLError();
      }

      const { name, setBornTo } = args;
      const foundAuthor = await Author.findOneAndUpdate(
        {
          name: args.name
        },
        {
          born: setBornTo
        },
        { new: true }
      );
      if (!foundAuthor) {
        throw new GraphQLError("Author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: name
          }
        });
      }
      return foundAuthor;
    },
    createUser: async (root, args) => {
      const { username } = args;

      if (await User.findOne({ username })) {
        throw new GraphQLError("That username already has an account", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username
          }
        });
      }
      try {
        const newUser = new User({ ...args });
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new GraphQLError("There was an error creating the user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error
          }
        });
      }
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user || password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }
      const userForToken = {
        username,
        id: user._id
      };
      const token = jwt.sign(userForToken, process.env.JWT_SECRET);
      return {
        value: token
      };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: async () => await pubsub.asyncIterator("BOOK_ADDED")
    }
  }
};

module.exports = resolvers;

class ForbiddenGQLError extends GraphQLError {
  constructor() {
    super("You need to log in to perform this operation", {
      extensions: {
        code: "FORBIDDEN"
      }
    });
  }
}

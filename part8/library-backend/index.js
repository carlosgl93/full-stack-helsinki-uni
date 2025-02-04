const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Book = require("./src/models/Book");
const Author = require("./src/models/Author");

mongoose.set("strictQuery", false);
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(error => {
    console.log("error connecting to mongo db: ", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e"
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e"
  }
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    authorId: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Agile software development",
    published: 2002,
    authorId: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"]
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    authorId: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    authorId: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"]
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    authorId: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"]
  },
  {
    title: "Crime and punishment",
    published: 1866,
    authorId: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"]
  },
  {
    title: "Demons",
    published: 1872,
    authorId: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"]
  }
];

const typeDefs = `
  enum Genre {
    refactoring
    design
    classic
    crime
    revolution
    patterns
    agile
    database
    nosql
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    genres: [String]
    id: ID
  }
    
  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: Genre): [Book!]!
    allAuthors: [Author!]!
  }
    
  type Mutation {
    addBook(title: String! published: Int genres: [Genre] author: String!): Book
    editAuthor(name: String setBornTo: Int): Author
  }
`;

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
      const populatedAuthors = await Promise.all(
        authors.map(a => {
          const bookCount = Book.countDocuments({
            author: a._id
          });
          return {
            ...a.toObject(),
            bookCount
          };
        })
      );
      return populatedAuthors;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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
          return newBook.populate("author");
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
    editAuthor: async (root, args) => {
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
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, {
  listen: { port: 4001 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

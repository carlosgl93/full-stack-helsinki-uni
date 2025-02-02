const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

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

//  * English:
//  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
//  * However, for simplicity, we will store the author's name in connection with the book

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
    published: Int!
    authorId: String!
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
    addBook(title: String! published: Int genres: [Genre] author: String): Book
    editAuthor(name: String setBornTo: Int): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author) {
        const authorId = authors.find(a => a.name === args.author).id;
        const authorBooks = books.filter(b => b.authorId === authorId);
        return authorBooks;
      }
      if (args.genre) {
        const result = books.filter(b => b.genres.includes(args.genre));
        console.log(result);
        return result;
      }

      return books;
    },
    allAuthors: () => {
      return authors.map(a => {
        const authorBooks = books.filter(b => b.authorId === a.id);
        return {
          ...a,
          bookCount: authorBooks.length
        };
      });
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const { title, author, genres, published } = args;
      if (books.find(b => b.title === title)) {
        throw new GraphQLError("Title of the book must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: title
          }
        });
      }
      let foundAuthor = authors.find(a => a.name === author);

      if (foundAuthor) {
        const newBook = { ...args, id: uuid(), authorId: foundAuthor.id };
        books.push(newBook);
        return newBook;
      } else {
        const newAuthor = {
          id: uuid(),
          name: author
        };
        authors.push(newAuthor);
        const newBook = { ...args, id: uuid(), authorId: newAuthor.id };
        books.push(newBook);
        return newBook;
      }
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args;
      console.log(name);
      const foundAuthor = authors.find(a => a.name.toLowerCase().trim() === name.toLowerCase().trim());
      console.log(foundAuthor);
      if (foundAuthor) {
        const updatedAuthor = {
          ...foundAuthor,
          born: setBornTo,
          bookCount: books.filter(b => b.authorId === foundAuthor.id).length
        };

        return updatedAuthor;
      }

      throw new GraphQLError("No author found by that name", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: name
        }
      });
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

const { books, authors } = require("./data");
const { v1: uuid } = require("uuid");

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (b) => b.author === args.author && b.genres.includes(args.genre)
        );
      } else if (args.author) {
        return books.filter((b) => b.author === args.author);
      } else if (args.genre) {
        return books.filter((b) => b.genres.includes(args.genre));
      } else {
        return books;
      }
    },
    allAuthors: () => {
      let authorsAndBooks = {};
      books.forEach((b) => {
        if (authorsAndBooks[b.author]) {
          authorsAndBooks[b.author]++;
        } else {
          authorsAndBooks[b.author] = 1;
        }
      });

      const result = authors.map((a) => ({
        ...a,
        bookCount: authorsAndBooks[a.name],
      }));
      return result;
    },
    findAuthorByName: (root, args) => {
      let author = authors.find((a) => a.name === args.name);
      const authorBooks = books.filter((b) => b.author === args.name);
      const result = {
        author,
        books: authorBooks,
      };
      return result;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = {
        ...args,
        id: uuid(),
      };
      books = books.concat(newBook);
      if (!authors.find((a) => a.name === args.author)) {
        authors = authors.concat({
          name: args.author,
          bookCount: 1,
        });
      }
      return newBook;
    },
    updateBornYear: (root, args) => {
      let authorToUpdate = authors.find((a) => a.name === args.name);
      if (authorToUpdate) {
        authorToUpdate = {
          ...authorToUpdate,
          born: args.year,
        };
        authors.map((a) =>
          a.name === authorToUpdate.name ? authorToUpdate : a
        );
        return authorToUpdate;
      }
      return null;
    },
  },
};

module.exports = {
  resolvers,
};

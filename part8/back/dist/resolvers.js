import { books, authors } from "./data";
import { v1 as uuid } from "uuid";
export const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            if (args.author && args.genre) {
                return books.filter((b) => b.author === args.author && b.genres.includes(args.genre));
            }
            else if (args.author) {
                return books.filter((b) => b.author === args.author);
            }
            else if (args.genre) {
                return books.filter((b) => b.genres.includes(args.genre));
            }
            else {
                return books;
            }
        },
        allAuthors: () => {
            let authorsAndBooks = {};
            books.forEach((b) => {
                if (authorsAndBooks[b.author]) {
                    authorsAndBooks[b.author]++;
                }
                else {
                    authorsAndBooks[b.author] = 1;
                }
            });
            const result = authors.map((a) => (Object.assign(Object.assign({}, a), { bookCount: authorsAndBooks[a.name] })));
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
            let newBooks;
            let newAuthors;
            let newBook = Object.assign(Object.assign({}, args), { id: uuid() });
            newBooks = books.concat(newBook);
            if (!authors.find((a) => a.name === args.author)) {
                /* tslint:disable-next-line */
                newAuthors = authors.concat({
                    /* tslint:disable-next-line */
                    name: args.author,
                    /* tslint:disable-next-line */
                    bookCount: 1,
                    /* tslint:disable-next-line */
                });
            }
            return newBook;
        },
        editAuthor: (root, args) => {
            let authorToUpdate = authors.find((a) => a.name === args.name);
            if (authorToUpdate) {
                authorToUpdate = Object.assign(Object.assign({}, authorToUpdate), { born: args.year });
                authors.map((a) => a.name === authorToUpdate.name ? authorToUpdate : a);
                return authorToUpdate;
            }
            return null;
        },
    },
};

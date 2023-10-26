import { Author, Genres } from ".";


export type Book = {
  title: string;
  published?: number;
  author: Author;
  id: string;
  genres?: [Genres];
};

import { Author } from ".";

export enum GENRES {
  classic,
  revolution,
  crime,
  refactoring,
  design,
  agile,
  patterns,
}

export type Book = {
  title: string;
  published?: number;
  author: Author;
  id: string;
  genres?: [GENRES];
};

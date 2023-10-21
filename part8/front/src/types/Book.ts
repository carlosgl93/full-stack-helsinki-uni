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
  author: string;
  id: string;
  genres?: [GENRES];
};

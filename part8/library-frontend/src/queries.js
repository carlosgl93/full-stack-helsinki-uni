import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      published
      authorId
      genres
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation Mutation($title: String!, $published: Int, $genres: [Genre], $author: String) {
    addBook(title: $title, published: $published, genres: $genres, author: $author) {
      title
      published
      authorId
      genres
      id
    }
  }
`;

export const ADD_BIRTH_DAY = gql`
  mutation Mutation($setBornTo: Int, $name: String!) {
    editAuthor(setBornTo: $setBornTo, name: $name) {
      name
      id
      born
      bookCount
    }
  }
`;

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
  query AllBooks($author: String, $genre: Genre) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      genres
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int, $genres: [Genre]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      genres
      id
    }
  }
`;

export const ADD_BIRTH_DAY = gql`
  mutation EditAuthor($name: String, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query Query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

import { gql } from "@apollo/client";

export let ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [GENRES]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author
      genres
      id
      published
      title
    }
  }
`;

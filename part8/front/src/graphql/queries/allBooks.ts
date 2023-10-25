import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
        id
        bookCount
      }
      published
      genres
      id
    }
  }
`;

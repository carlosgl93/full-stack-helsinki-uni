import { gql } from "@apollo/client";

export const FIND_AUTHOR = gql`
  query findAuthorByName($name: String!) {
    findAuthorByName(name: $name) {
      author {
        bookCount
        born
        id
        name
      }
      books {
        genres
        id
        published
        title
      }
    }
  }
`;

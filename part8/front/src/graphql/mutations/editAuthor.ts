import { gql } from "@apollo/client";

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $year: Int) {
    editAuthor(name: $name, year: $year) {
      bookCount
      born
      id
      name
    }
  }
`;

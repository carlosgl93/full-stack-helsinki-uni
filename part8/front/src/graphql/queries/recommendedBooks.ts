import { gql } from '@apollo/client';

export const RECOMMENDED_BOOKS = gql`
  query recommendedBooks($genre: String!) {
    recommendedBooks(genre: $genre) {
      genres
      id
      published
      title
      author {
        name
      }
    }
  }
`;

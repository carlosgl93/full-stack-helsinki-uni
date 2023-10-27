import { gql } from "@apollo/client";

export const SET_FAVORITE_GENRE = gql`
  mutation Mutation($genre: String!) {
    setFavoriteGenre(genre: $genre) {
      author {
        name
      }
      genres
      id
      published
      title
    }
  }
`;

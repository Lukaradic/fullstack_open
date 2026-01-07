import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;

export const GET_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        id
        born
      }
      id
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query Query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

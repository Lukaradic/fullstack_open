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
  query AllBooks {
    allBooks {
      title
      published
      author
      id
    }
  }
`;

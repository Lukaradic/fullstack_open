import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation Mutation(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author {
        name
        id
        born
      }
      id
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation Mutation($author: String!, $setBornTo: Int!) {
    editAuthor(author: $author, setBornTo: $setBornTo) {
      name
      id
      born
    }
  }
`;

export const LOG_IN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

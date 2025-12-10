import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation Mutation(
    $title: String!
    $author: String!
    $addBookId: ID!
    $published: Int
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      id: $addBookId
      published: $published
      genres: $genres
    ) {
      title
      published
      author
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

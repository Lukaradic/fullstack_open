import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { ApolloProvider } from "@apollo/client/react";
import { OperationTypeNode } from "graphql";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("access-token") ?? "";
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token,
    },
  }));

  return forward(operation);
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000",
  })
);

const splitLink = ApolloLink.split(
  ({ operationType }) => {
    return operationType === OperationTypeNode.SUBSCRIPTION;
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: ApolloLink.from([authLink, splitLink]),
  cache: new InMemoryCache(),
});

export const LibraryProvider = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache(),
});

export const LibraryProvider = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

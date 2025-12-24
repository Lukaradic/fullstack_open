import { ApolloServer } from "@apollo/server";

import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

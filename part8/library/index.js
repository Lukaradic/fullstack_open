import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { useServer } from "graphql-ws/use/ws";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "./mongoose/User.js";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;

const url = `mongodb+srv://radicluka17_db_user:${dbPassword}@cluster0.8fxjf29.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(url)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) =>
    console.log("error connecting to the DB, message: ", err.message)
  );

const app = express();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/",
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authToken = req?.headers?.authorization ?? null;

      if (authToken) {
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
  })
);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});

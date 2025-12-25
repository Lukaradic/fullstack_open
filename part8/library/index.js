import { startStandaloneServer } from "@apollo/server/standalone";
import { server } from "./server.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "./mongoose/User.js";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;

const url = `mongodb+srv://radicluka17_db_user:${dbPassword}@cluster0.8fxjf29.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(url)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) =>
    console.log("error connecting to the DB, message: ", err.messagge)
  );

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const authToken = req?.headers?.authorization ?? null;

    if (authToken) {
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

import { startStandaloneServer } from "@apollo/server/standalone";
import { server } from "./server.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

import mongoose from "mongoose";
import { env } from "./env.js";

const db = env.db;

const connection = mongoose.connect(db.url);
export default connection;

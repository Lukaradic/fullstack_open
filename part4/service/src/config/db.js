import mongoose from "mongoose";
import { env } from "./env.js";

const db = env.db;

mongoose.connect(db.url);

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

export const Blog = mongoose.model("Blog", blogSchema);

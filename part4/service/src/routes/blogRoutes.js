import express from "express";
import { getBlogs, createBlog } from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get(`/api/blogs`, getBlogs);
blogRouter.post("/api/blogs", createBlog);

export default blogRouter;

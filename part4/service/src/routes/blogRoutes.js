import express from "express";
import {
  getAllBlogsController,
  createBlogController,
  deleteBlogController,
  updateBlogLikesController,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get(`/api/blogs`, getAllBlogsController);
blogRouter.post("/api/blogs", createBlogController);
blogRouter.delete("/api/blogs/:id", deleteBlogController);
blogRouter.put("/api/blogs/:id", updateBlogLikesController);

export default blogRouter;

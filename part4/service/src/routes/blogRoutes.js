import express from "express";
import {
  getAllBlogsController,
  createBlogController,
  deleteBlogController,
  updateBlogLikesController,
  getCommentsController,
  createCommentController,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get(`/api/blogs`, getAllBlogsController);
blogRouter.post("/api/blogs", createBlogController);
blogRouter.delete("/api/blogs/:id", deleteBlogController);
blogRouter.put("/api/blogs/:id", updateBlogLikesController);
blogRouter.get("/api/blogs/:id/comments", getCommentsController);
blogRouter.post("/api/blogs/:id/comments", createCommentController);

export default blogRouter;

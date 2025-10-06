import { Blog } from "../config/db.js";

export const getAll = async () => {
  return await Blog.find({});
};

export const create = async (blogData) => {
  const newBlog = new Blog(blogData);
  return await newBlog.save();
};

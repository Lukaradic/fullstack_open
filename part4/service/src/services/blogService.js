import { Blog } from "../models/blogModel.js";

export const getAll = async () => {
  return await Blog.find({});
};

export const create = async (blogObj) => {
  const newBlog = new Blog(blogObj);
  return await newBlog.save();
};

export const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

export const updateBlog = async (id, { likes }) => {
  return await Blog.findByIdAndUpdate(id, { likes }, { new: true });
};

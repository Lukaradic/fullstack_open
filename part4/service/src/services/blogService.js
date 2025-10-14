import { Blog } from "../models/blogModel.js";
import { User } from "../models/userModel.js";

export const getAll = async () => {
  return await Blog.find({}).populate("user");
};

export const create = async (blogObj) => {
  const newBlog = new Blog(blogObj);
  const blogResponse = await newBlog.save();
  await User.findByIdAndUpdate(blogObj.user, {
    $push: { blogs: blogResponse.id },
  });
  return blogResponse;
};

export const deleteBlog = async (id, userId) => {
  const response = await Blog.findByIdAndDelete({
    _id: id,
    user: userId,
  });
  await User.findByIdAndUpdate(userId, { $pull: { blogs: id } });
  return response;
};

export const updateBlog = async (id, { likes }) => {
  return await Blog.findByIdAndUpdate(id, { likes }, { new: true });
};

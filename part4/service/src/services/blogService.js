import { Blog } from "../models/blogModel.js";
import { User } from "../models/userModel.js";
import { Comment } from "../models/commentModel.js";

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

export const updateBlog = async (id, data) => {
  const { title, author, url, likes, user } = data;
  const newLikes = likes + 1;
  return await Blog.findByIdAndUpdate(
    id,
    {
      title,
      author,
      user,
      url,
      likes: newLikes,
    },
    { new: true, populate: "user" }
  );
};

export const getComments = async (id) => {
  return await Comment.find({ blog: id });
};

export const createComment = async (id, content) => {
  const commentObj = new Comment({
    content,
    blog: id,
  });
  const savedComment = await commentObj.save();
  await Blog.findByIdAndUpdate(id, { $push: { comments: commentObj._id } });

  return savedComment;
};

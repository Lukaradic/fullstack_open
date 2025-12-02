import {
  getAll,
  create,
  deleteBlog,
  updateBlog,
  createComment,
  getComments,
} from "../services/blogService.js";

export const getAllBlogsController = async (_, res, next) => {
  try {
    const blogs = await getAll();
    res.status(200).json({ data: blogs });
  } catch (error) {
    next(error);
  }
};

export const createBlogController = async (req, res, next) => {
  try {
    const { title, url, likes = 0 } = req.body || {};
    const { username: name, id: userId } = req.user || {};

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!title || !url) {
      res.status(400).json({ status: "NOT_OK", message: "Bad data" });
    }

    const response = await create({
      title,
      author: name,
      url,
      likes,
      user: userId,
    });
    res.status(201).json({ data: response });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req?.params || {};
    const { id: userId } = req.user || {};

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!id) {
      res.status(400).json({ message: "Bad request, missing id" });
    }
    await deleteBlog(id, userId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlogLikesController = async (req, res) => {
  try {
    const { id } = req?.params || {};
    const data = req.body;

    const response = await updateBlog(id, data);
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentsController = async (req, res) => {
  try {
    const blogId = req?.params?.id;
    const response = await getComments(blogId);
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createCommentController = async (req, res) => {
  try {
    const blogId = req.params.id;
    const content = req?.body?.content;
    const response = await createComment(blogId, content);
    res.status(201).json({ data: response });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

import { getAll, create } from "../services/blogService.js";

export const getBlogs = async (_, res, next) => {
  try {
    const blogs = await getAll();
    res.status(200).json({ data: blogs });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body || {};
    console.log(req.body);

    if (!title || !author || !url || !likes) {
      res.status(400).json({ status: "NOT_OK", message: "Bad data" });
    }
    const response = await create({ title, author, url, likes });
    res.status(204).json({ data: response });
  } catch (error) {
    next(error);
  }
};

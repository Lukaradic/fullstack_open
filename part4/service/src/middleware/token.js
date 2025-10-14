import jwt from "jsonwebtoken";

export const tokenExtractor = (req, _, next) => {
  const token = req.headers.authorization;
  req.token = token ? token : null;
  next();
};

export const userExtractor = (req, _, next) => {
  const user = jwt.decode(req.token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

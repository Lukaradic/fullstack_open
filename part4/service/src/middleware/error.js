const errorNameMapper = {
  jwt: "JsonWebTokenError",
  jwtExipred: "TokenExpiredError",
  validation: "ValidationError",
  cast: "CastError",
};

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Something went wrong";
  const name = err?.name;
  res.status(statusCode).json({ message, success: false });
};

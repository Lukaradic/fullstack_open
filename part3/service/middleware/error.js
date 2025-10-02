const errorHandler = (error, request, response, next) => {
  const { name, message } = error || {};

  if (name === 'CastError') {
    return response.status(400).send({ message: 'malformatted id' });
  }
  if (name === 'ValidationError') {
    return response.status(400).json({ message, success: false });
  }

  next(error);
};

module.exports = errorHandler;

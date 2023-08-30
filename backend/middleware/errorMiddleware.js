const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404); // 404 means not found
  next(error);
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400; 
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}

export { notFound, errorHandler};
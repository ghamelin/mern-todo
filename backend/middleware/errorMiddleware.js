const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404); // 404 means not found
  next(error);
}

const errorHandler = (err, req, res, next) => {
  // Sometimes the error code is 200, but we want it to be 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    // We want to show the stack trace only in development mode
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}

export { notFound, errorHandler };
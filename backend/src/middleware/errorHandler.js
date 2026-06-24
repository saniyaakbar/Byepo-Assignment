export const errorHandler = (err, req, res, next) => {
  // Log error details for server debugging only
  console.error('[Error]', err.name || 'UnknownError', ':', err.message);

  let statusCode = 500;
  let message = 'Something went wrong';

  // Mongoose bad ObjectId - respond with generic message
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid request parameters';
  }
  // Mongoose duplicate key - generic message
  else if (err.code === 11000) {
    statusCode = 400;
    message = 'This record already exists';
  }
  // Mongoose validation error - generic message
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Invalid data provided';
  }
  // Syntax/JSON parse errors
  else if (err instanceof SyntaxError) {
    statusCode = 400;
    message = 'Invalid request format';
  }

  // Never expose raw error messages to frontend
  res.status(statusCode).json({
    success: false,
    message,
  });
};

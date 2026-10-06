// Centralized Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for server console debugging
  console.error('[Error Middleware]:', err.message || err);

  // Validation Error (Missing fields, negative values)
  if (
    err.message.includes('required') ||
    err.message.includes('cannot be negative') ||
    err.name === 'ValidationError'
  ) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Duplicate Key Error (Code 11000 - e.g., duplicate item name)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Duplicate database entry violation'
    });
  }

  // Cast / ID Error
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      message: `Resource not found with id of ${err.value}`
    });
  }

  // Default Error Response
  res.status(err.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;

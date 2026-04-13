function errorHandler(error, _req, res, _next) {
  if (error.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: error.code === 'LIMIT_FILE_SIZE' ? 'Image size must be less than 5MB' : error.message
    });
  }

  const statusCode = error.statusCode || 500;
  const payload = {
    success: false,
    message: error.message || 'Internal server error'
  };

  if (error.errors) {
    payload.errors = error.errors;
  }

  res.status(statusCode).json(payload);
}

module.exports = errorHandler;

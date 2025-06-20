// Define a custom Express error handling middleware function
const errorHandler = (err, req, res, next) => {
  // Log the full stack trace to the server console for debugging
  console.error('Error caught by middleware:', err.stack);

  // Respond to the client with a standard JSON error structure
  res.status(err.statusCode || 500).json({
    success: false,                           // Indicates request was not successful
    message: err.message || 'Server Error'    // Send custom or fallback message
  });
};

// Export the middleware so it can be used in index.js
export default errorHandler;
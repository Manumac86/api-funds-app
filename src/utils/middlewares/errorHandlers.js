const { config } = require('../../../config');

/**
 * Log in console the error stack.
 * @module errorHandlers
 * @function
 *
 * @param {Object}   err   Express error object.
 * @param {Object}   req   Express request object.
 * @param {Object}   res   Express response object.
 * @param {Function} next  Express next middleware function.
 */
function logErrors(err, req, res, next) {
  console.log(err.stack);
  next(err);
}
/**
 * Handles client errors.
 * @module errorHandlers
 * @function
 *
 * @param {Object}   err   Express error object.
 * @param {Object}   req   Express request object.
 * @param {Object}   res   Express response object.
 * @param {Function} next  Express next middleware function.
 */
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: err });
  } else {
    next(err);
  }
}
/**
 * Default error handler.
 * @module errorHandlers
 * @function
 *
 * @param {Object}   err   Express error object.
 * @param {Object}   req   Express request object.
 * @param {Object}   res   Express response object.
 * @param {Function} next  Express next middleware function.
 */
function errorHandler(err, req, res, next) {
  // Catch errors while streaming.
  if (res.headersSent) {
    next(err);
  }

  // Delete error stack in production mode.
  if (!config.dev) {
    delete err.stack;
  }

  // Add status and error message to the response.
  res.status(err.status || 500).json({ Error: err.message });
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler
};

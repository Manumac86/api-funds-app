const boom = require('@hapi/boom');
/**
 * Validates the received data with the schema.
 * @module validationHandler
 * @function
 *
 * @param {Object} data    The received data
 * @param {Object} schema  The data schema to validate with.
 *
 * @return {Boolean}
 */
function validate(data, schema) {
  const { error } = schema.validate(data);
  return error;
}

/**
 * Validates the received data with the schema.
 * @module validationHandler
 * @function
 *
 * @param {Object} data    The received data
 * @param {Object} schema  The data schema to validate with.
 *
 * @return {Boolean}
 */
function validationHandler(schema, check = 'body') {
  return (req, res, next) => {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;

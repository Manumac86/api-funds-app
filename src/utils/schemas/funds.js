const Joi = require('joi');

/**
 * Define the schema for the received data when creating a new Fund.
 * @schema
 *
 * @type {Object}
 */
const createFundSchema = Joi.object({
  name: Joi.string().max(50).required(),
  amount: Joi.number().min(0).max(10000).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required()
});

module.exports = createFundSchema;

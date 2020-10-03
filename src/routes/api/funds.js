const express = require('express');
const passport = require('passport');
const FundsService = require('../../services/funds');
const createFundSchema = require('../../utils/schemas/funds');
const validation = require('../../utils/middlewares/validationHandler');

/**
 * Express router to mount funds related functions on.
 * @type {Object}
 * @const
 * @namespace fundsApiRouter
 */
const fundsApiRouter = express.Router();
/**
 * The instance of FundsService.
 * @type {FundsService}
 */
const fundsService = new FundsService();

/**
 * Require the Passport JWT Strategy
 */
require('../../utils/auth/strategies/jwt');

/**
 * Route to get the funds collection.
 * GET: Get all the funds.
 * @function
 *
 * @param {string}   path        Express path.
 * @param {Function} middleware  Passport authentication middleware.
 * @param {callback} middleware  Express middleware.
 */
fundsApiRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const funds = await fundsService.getFunds();

      res.status(200).json({
        data: funds,
        message: 'OK'
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Route to add a new fund to the funds collection.
 * POST: Add a fund.
 * @function
 *
 * @param {string}   path        Express path
 * @param {Function} middleware  Passport authentication middleware.
 * @param {Function} middleware  Data validation middleware.
 * @param {callback} middleware  Express middleware.
 */
fundsApiRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validation(createFundSchema),
  async (req, res, next) => {
    const { body: fund } = req;

    try {
      const createdFundId = await fundsService.createFund({ fund });

      res.status(201).json({
        data: {
          id: createdFundId
        },
        message: 'CREATED'
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = fundsApiRouter;

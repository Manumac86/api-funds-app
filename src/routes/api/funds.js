const express = require('express');
const FundsService = require('../../services/funds');
const createFundSchema = require('../../utils/schemas/funds');
const validation = require('../../utils/middlewares/validationHandler');

/**
 * Express router to mount funds related functions on.
 * @type {object}
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
 * Route to get the funds collection.
 * GET: Get all the funds.
 * @function
 *
 * @param {string}   path        Express path
 * @param {callback} middleware  Express middleware.
 */
fundsApiRouter.get('/', async (req, res, next) => {
  try {
    const funds = await fundsService.getFunds();

    res.status(200).json({
      data: funds,
      message: 'OK',
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Route to add a new fund to the funds collection.
 * POST: Add a fund.
 * @function
 *
 * @param {string}   path        Express path
 * @param {callback} middleware  Express middleware.
 */
fundsApiRouter.post('/', validation(createFundSchema), async (req, res, next) => {
  const { body: fund } = req;

  try {
    const createdFundId = await fundsService.createFund({ fund });

    res.status(201).json({
      data: {
        id: createdFundId,
      },
      message: 'CREATED',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = fundsApiRouter;

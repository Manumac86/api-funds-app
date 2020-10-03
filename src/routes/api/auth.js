const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

/**
 * Express router to mount auth related functions on.
 * @type {Object}
 * @const
 * @namespace authApiRouter
 */
const authApiRouter = express.Router();

const { config } = require('../../../config/index');

/**
 * Require the Passport Basic Strategy
 */
require('../../utils/auth/strategies/basic');

/**
 * Route to get the auth token in order to authenticate requests.
 * POST: Post the auth data to get the auth token.
 * @function
 *
 * @param {string}   path        Express path.
 * @param {callback} middleware  Express middleware.
 */
authApiRouter.post('/token', async (req, res, next) => {
  passport.authenticate('basic', (error, user) => {
    try {
      if (error || !user) {
        next(boom.unauthorized());
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          next(error);
        }

        const payload = { sub: user.username, email: user.email };
        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '15m'
        });

        return res.status(200).json({ access_token: token });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

module.exports = authApiRouter;

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const { config } = require('../../../../config/index');
const MongoLib = require('../../../../lib/mongo');

/**
 * Use passport to implement JWT Strategy.
 */
passport.use(
  /**
   * Instance Strategy to create JWT Strategy.
   */
  new Strategy(
    /**
     * Config Object.
     */
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    /**
     * Get the admin user from the database.
     *
     * @return {Function}
     */
    async (tokenPayload, cb) => {
      /**
       * The mongoDB instance.
       * @type {MongoLib}
       */
      const mongoDB = new MongoLib();

      try {
        /**
         * The admin user from de database.
         * @type {Object}
         */
        const [ user ] = await mongoDB.getAll('users', {
          username: tokenPayload.sub
        });
        /**
         * If the user doesn't exist, return an error (Unauthorized).
         */
        if (!user) {
          return cb(boom.unauthorized(), false);
        }
        /**
         * If the user exists, return the user.
         */
        return cb(null, user);
      } catch (error) {
        /**
         * If an error ocurs, return the error.
         */
        return cb(error);
      }
    }
  )
);

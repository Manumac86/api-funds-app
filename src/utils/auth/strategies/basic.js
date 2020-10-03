const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const MongoLib = require('../../../../lib/mongo');

/**
 * Use passport to implement JWT Strategy.
 */
passport.use(
  /**
   * Create Basic Strategy.
   */
  new BasicStrategy(async (username, password, cb) => {
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
      const [ user ] = await mongoDB.getAll('users', { username });
      /**
       * If the user doesn't exist, return an error (Unauthorized).
       */
      if (!user) {
        return cb(boom.unauthorized(), false);
      }
      /**
       * If the user password doesn't match, return an error (Unauthorized).
       */
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }
      /**
       * If the user exists and the password is valid, return the user.
       */
      return cb(null, user);
    } catch (error) {
      /**
       * If an error ocurs, return the error.
       */
      return cb(error);
    }
  })
);

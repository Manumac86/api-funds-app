const express = require('express');
const fundsApiRouter = require('./routes/api/funds');
const {
  logErrors,
  errorHandler,
} = require('./utils/middlewares/errorHandlers');

/**
 * Initialize Express App.
 */
const app = express();

/**
 * Parse requests of content-type - application/json
 */
app.use(express.json());

/**
 * Set trust the first proxy.
 */
app.set('trust proxy', 1);

/**
 * Use the foundsApiRouter to get the funds routes.
 */
app.use('/api/funds', fundsApiRouter);

/**
 * Use the `logErrors` error handler.
 */
app.use(logErrors);
/**
 * Use the `errorHandler` error handler.
 */
app.use(errorHandler);

/**
 * Express Server.
 * Listen on a specific port and log the listening address.
 *
 * @param {number}   port      The port to listen to.
 * @param {string}   host      The host address to listen to.
 * @param {callback} callback  The callback to execute when success.
 */
const server = app.listen(8000, 'localhost', () => {
  console.log(`Listening http://${server.address().address}:${server.address().port}`);
});

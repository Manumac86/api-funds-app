const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const fundsApiRouter = require('./routes/api/funds');
const authApiRouter = require('./routes/api/auth');
const { config } = require('../config');

const {
  logErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorHandlers');

/**
 * Config CORS.
 */
const corsOptions = config.dev ? {} : { origin: 'https://front-funds-app.web.app' };

/**
 * Initialize Express App.
 */
const app = express();

/**
 * Use Helmet to securize requests.
 */
app.use(helmet());

/**
 * Use CORS to avoid request from undesired origins.
 */
app.use(cors(corsOptions));

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
 * Use the foundsApiRouter to get the funds routes.
 */
app.use('/api/auth', authApiRouter);

/**
 * Route to validate if service is up.
 */
app.get('/api/service/ready',
  async (req, res) => {
    res.status(200).json({
      data: {
        service: 'READY'
      },
      message: 'OK'
    });
  });

/**
 * Use the `logErrors` error handler.
 */
app.use(logErrors);
/**
 * Use the `clientErrorHandler` error handler.
 */
app.use(clientErrorHandler);
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
const server = app.listen((process.env.PORT || 8000), () => {
  console.log(`Listening http://${server.address().address}:${server.address().port}`);
});

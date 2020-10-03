const { MongoClient } = require('mongodb');
const { config } = require('../config');

/**
 * The mongodb user.
 * @type {string}
 */
const USER = encodeURIComponent(config.dbUser);
/**
 * The mongodb password.
 * @type {string}
 */
const PASSWORD = encodeURIComponent(config.dbPassword);
/**
 * The mongodb DB name.
 * @type {string}
 */
const DB_NAME = config.dbName;
/**
 * The mongodb URI to make the connection to db.
 * @type {string}
 */
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`; // prettier-ignore

/**
 * The MongoDB class to handle mongo operations.
 *
 * @class MongoLib
 */
class MongoLib {
  /**
   * Creates an instance of MongoLib.
   * @constructor
   * @memberof MongoLib
   */
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  /**
   * Connect to MongoDB.
   *
   * @return {Promise}
   * @memberof MongoLib
   */
  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) {
          reject(error);
        }
        console.log('Connected successfully to mongo');
        resolve(this.client.db(this.dbName));
      });
    });
  }

  /**
   * Get all items in the indicated collection.
   *
   * @param {string} collection  The name of the collection to get.
   * @param {string} query       The query to search for.
   *
   * @return {Array}
   * @memberof MongoLib
   */
  getAll(collection, query) {
    return this.connect()
      .then(db => db.collection(collection).find(query).toArray());
  }

  /**
   * Create a single item in the indicated collection.
   *
   * @param {string} collection  The name of the collection to get.
   * @param {Object} data        The data to add into the collection.
   *
   * @return {string}
   * @memberof MongoLib
   */
  create(collection, data) {
    return this.connect()
      .then(db => db.collection(collection).insertOne(data))
      .then(result => result.insertedId);
  }
}

module.exports = MongoLib;

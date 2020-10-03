const MongoLib = require('../../lib/mongo');

/**
 * The Funds Service.
 * Makes the requests to the mongoDB service in order to interact with the database.
 *
 * @service FundsService
 */
class FundsService {
  /**
   * FundsService Constructor.
   * @constructor
   */
  constructor() {
    /**
     * The db collection name to read/write data.
     * @type {string}
     */
    this.collection = 'funds';
    /**
     * The mongo db connection service instance.
     */
    this.mongoDB = new MongoLib();
  }

  /**
   * Get the funds collection.
   *
   * @return {Array} The funds array.
   */
  async getFunds() {
    const funds = await this.mongoDB.getAll(this.collection);

    return funds || [];
  }

  /**
   * Add a new fund to the funds collection.
   *
   * @param {Object} fund  The fund to add to the funds collection.
   *
   * @return {string} The new added fund id.
   */
  async createFund({ fund }) {
    const newFund = fund;
    newFund.created_at = new Date();

    const createdFundId = await this.mongoDB.create(this.collection, newFund);

    return createdFundId;
  }
}

module.exports = FundsService;

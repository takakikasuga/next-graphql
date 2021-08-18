const { portfolios } = require('./data');
const Portfolio = require('../models/portfolio');

class FakeDB {
  async clear() {
    await Portfolio.deleteMany({});
  }

  async addData() {
    await Portfolio.create(portfolios);
  }

  async populate() {
    await this.clear();
    await this.addData();
  }
}

module.exports = FakeDB;

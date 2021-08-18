const mongoose = require('mongoose');
const config = require('../config/index');
const fakeDB = require('./index');

mongoose.connect(
  config.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async () => {
    console.log('Starting populatind DB .....');
    await new fakeDB().populate();
    await mongoose.connection.close();
    console.log('Connected Mongo DB...');
  }
);

const mongoose = require('mongoose');
const config = require('../config/index');

exports.connect = () => {
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('Connected Mongo DB...');
    }
  );
};

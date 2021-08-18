const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PortfolioSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      maxLength: 128
    },
    company: {
      type: String,
      require: true,
      maxLength: 64
    },
    companyWebsite: {
      type: String,
      require: true,
      maxLength: 128
    },
    location: {
      type: String,
      require: true,
      maxLength: 128
    },
    jobTitle: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    startDate: {
      type: Date,
      require: true
    },
    endDate: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Portfolio', PortfolioSchema);

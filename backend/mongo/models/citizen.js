const mongoose = require('mongoose');

const CitizenSchema = new mongoose.Schema({
  userID: Number,
  name: String,
  demographicInfo: {
    age: Number,
    gender: String,
    party: String,
    education: String,
    income: Number,
    address: {
      street: String,
      city: String,
      state: String,
      zip: Number
    }
  }
});

// Create a Citizen Model and Export It
module.exports = mongoose.model('Citizen', CitizenSchema);

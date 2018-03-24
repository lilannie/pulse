const mongoose = require('mongoose');

const Citizen = new mongoose.Schema({
  blockchainID: Number,
  demographicInfo: {
    age: Number,
    gender: String,
    race: String,
    religion: String,
    income: String,
    marital: String,
    state: String,
    party: String,
    ideology: String,
    educationLevel: String,
    citizen: String
  }
});

// Create a Votable Model and Export It
module.exports = mongoose.model('Citizen', Citizen);

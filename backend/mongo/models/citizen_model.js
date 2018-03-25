const mongoose = require('mongoose');

const Citizen = new mongoose.Schema({
  age: String,
  gender: String,
  race: String,
  religion: String,
  income: String,
  marital: String,
  state: String,
  party: String,
  ideology: String,
  educationLevel: String,
  isCitizen: String
});

// Create a Votable Model and Export It
module.exports = mongoose.model('Citizen', Citizen);

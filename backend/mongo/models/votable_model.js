const mongoose = require('mongoose');

const Votable = new mongoose.Schema({
  // contract_id: String,
  // creator_id: Number,
  // title: String,
  description: String,
  choices: [String],
	topics: [String]
});

// Create a Votable Model and Export It
module.exports = mongoose.model('Votable', Votable);

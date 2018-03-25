const mongoose = require('mongoose');

const Vote = new mongoose.Schema({
  voterAddress: String,
  contractAddress: String,
	response: String
});

// Create a Votable Model and Export It
module.exports = mongoose.model('Vote', Vote);
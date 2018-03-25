const mongoose = require('mongoose');

const Vote = new mongoose.Schema({
  userId: String,
  votableId: String,
	choice: String
});

// Create a Votable Model and Export It
module.exports = mongoose.model('Vote', Vote);

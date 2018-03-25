const mongoose = require('mongoose');

const Vote = new mongoose.Schema({
  user_id: Number,
  votable_id: Number,
  choice: String
});

// Create a Votable Model and Export It
module.exports = mongoose.model('Vote', Vote);

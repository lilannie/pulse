const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  creator_id: Number,
  content: String,
  rank: Number,
  date: Date
});

// Create a Votable Model and Export It
module.exports = mongoose.model('Comment', Comment);

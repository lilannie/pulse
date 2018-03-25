const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  content: String,
  comments: [String],
  topics: [String],
  location: String,
  rank: Number,
  date: Date
});

module.exports = mongoose.model('Post', Post);

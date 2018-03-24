const mongoose = require('mongoose');

const Topic = new mongoose.Schema({
  ID: Number,
  title: String
});

module.exports = mongoose.model('Topic', Topic);

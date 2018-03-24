const mongoose = require('mongoose');

const Topic = new mongoose.Schema({
  _custom_id: Number,
  title: String
});

module.exports = mongoose.model('Topic', Topic);

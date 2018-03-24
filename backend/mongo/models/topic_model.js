const mongoose = require('mongoose');

const Topic = new mongoose.Schema({
  title: String
});

module.exports = mongoose.model('Topic', Topic);

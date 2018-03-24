const mongoose = require('mongoose');

const Votable = new mongoose.Schema({
  description: String,
  choices: Array
});

// Create a Votable Model and Export It
module.exports = mongoose.model('Votable', Votable);

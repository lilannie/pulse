const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.connect = () => {
  mongoose.connect('mongodb://localhost/hackathon');
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!');
  });
  mongoose.connection.on('error', err => {
    console.log(err);
    process.exit();
  });
};

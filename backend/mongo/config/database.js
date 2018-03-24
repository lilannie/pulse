const mongoose = require('mongoose');

exports.connect = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/hackathon');
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!');
  });
  mongoose.connection.on('error', err => {
    console.log(err);
    process.exit();
  });
};

exports.close = () => {
  mongoose.disconnect();
};

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/hackathon').then(() => {
      console.log(mongoose.connection.readyState);
      return resolve(mongoose.connection.readyState);
    });
  });
  mongoose.connection.on('error', err => {
    console.log(err);
    process.exit();
  });
};

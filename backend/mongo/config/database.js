const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost:27017/hackathon').then(() => {
      console.log(mongoose.connection.readyState);
      return resolve(mongoose.connection);
    });
  });
  mongoose.connection.on('error', err => {
    console.log(err);
    process.exit();
  });
};

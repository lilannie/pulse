const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.connect = () => {
	return mongoose.connect('mongodb://localhost:27017/hackathon');
};

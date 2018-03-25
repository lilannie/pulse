const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.connect = () => {
	//   return mongoose.connect('mongodb://10.33.148.54:27017/hackathon');

	return mongoose.connect('mongodb://localhost:27017/hackathon');
};

const Votable = require('../models/votable_model');
const Vote = require('../models/vote_model');

exports.insert = votable => new Promise((resolve, reject) => {
	let votable = new Votable(votable);

	votable.save((err, result) => {
		if (err) {
			reject(err);
		}
		resolve(result);
	});
});

exports.getVoterHistory = params => new Promise ((resolve, reject) => {
  Vote.findAll({ user_id: params.user_id }, (error, results) => {
	  if (error) {
		  reject(error);
	  }

	  let ret_val = {};

	  for (let result of results) {
	  	ret_val[result._id] = result.choice;
	  }

	  resolve(ret_val);
  });
});

exports.saveVote = (user_id, votable_contract_id, choice) => {
  // Check if user has already voted on the votable, if so update that vote
  // If the user has not already voted on the votable, create a vote
  // return {
  //   status: 'Success',
  //   error: null
  // };
};

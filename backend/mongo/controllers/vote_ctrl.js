const Citizen = require('../models/citizen_model');
const Vote = require('../models/vote_model');
const _ = require('lodash');

exports.getVotesGroupByState = contract_id => new Promise((resolve, reject) => {
	Vote.find({
		contract_id
	}, (error, votes) => {
		console.log(votes);

		Citizen.find({
			'blockchainId': {
				$in: votes.map(vote => vote.blockchainId)
			}
		}, (error, docs) => {
			if (error) return reject(error);

			resolve(_.groupBy(_.union(docs, votes, 'blockchainId'), 'demographicInfo.state'));
		});
	});
});
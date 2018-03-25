const Citizen = require('../models/citizen_model');
const Vote = require('../models/vote_model');
const _ = require('lodash');

exports.getVotesGroupByState = params => new Promise((resolve, reject) => {
	Vote.find({ contract_id: params.contract_id }, (error, votes) => {
		console.log(votes);

		Citizen.find({
			'voterAddress': {
				$in: votes.map(vote => vote.voterAddress)
			}
		}, (error, docs) => {
			if (error) return reject(error);

			resolve(_.groupBy(_.union(docs, votes, 'blockchainId'), 'demographicInfo.state'));
		});
	});
});
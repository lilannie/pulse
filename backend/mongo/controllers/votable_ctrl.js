const Votable = require('../models/votable_model');
const fetch = require('node-fetch');
const Citizen = require('../models/citizen_model');
const _ = require('lodash');

exports.insert = legislature => {
  let votable = new Votable({
    description: legislature.description,
    choices: legislature.choices
  });

  votable.save((err, result) => {
    if (err) {
      console.log(err.stack);
    }
    console.log('Doc Added Successfully!');
  });
};

exports.getVotableIDs = () => {
  Votable.distinct('_id', (err, results) => {
    // console.log(results);
  });
};

exports.getVoterHistory = user_blockchain_id => {
  // return {
  //   1: 'Agree', // _contract_id: choice the user made
  //   2: 'Neutral',
  //   3: 'Disagree'
  // };
};

// TODO
exports.saveVote = (user_blockchain_id, votable_contract_id, choice) => {
  // Check if user has already voted on the votable, if so update that vote
  // If the user has not already voted on the votable, create a vote
  // return {
  //   status: 'Success',
  //   error: null
  // };
};

exports.getVotesGroupByState = contract_id => new Promise((resolve, reject) => {
	fetch(`http://10.33.148.54:3333/contract/history/${contract_id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(responseBody => {
		// { data: { value: { addresses: [], response: [] } } }
		console.dir(responseBody);

		const {
			addresses,
			response
		} = responseBody.data.value;

		const votes = response.map((res, index) => {
			return {
				blockchainId: addresses[index],
				choice: res
			}
		});

		return new Promise((resolve, reject) => {
			Citizen.find({
				'blockchainId': {
					$in: addresses
				}
			}, (error, docs) => {
				if (error) return reject(error);

				resolve({
					docs, votes
				});
			});
		})
		.then(({ docs, votes }) => {
			resolve(_.groupBy(_.union(docs, votes, 'blockchainId'), 'demographicInfo.state'));
		})
		.catch(error => {
			reject(error);
		})
	})
});
const fetch = require('node-fetch');
const Votable = require('../models/votable_model');
const Vote = require('../models/vote_model');
const Citizen = require('../models/citizen_model');
const db = require('../config/database');

exports.insert = legislature => {
  let votable = new Votable({
    _contract_id: legislature._contract_id,
    title: legislature.title,
    description: legislature.description,
    choices: legislature.choices,
    topics: legislature.topics
  });

  votable.save((err, result) => {
    if (err) {
      console.log(err.stack);
    }
    console.log('Doc Added Successfully!');
  });
};

exports.getVotableIDs = () => {
  Votable.distinct('._creator_id', (err, results) => {
    console.log(results);
  });
};

exports.getVoterHistory = (id) => {

  Vote.find({_id: id}, (vote) => {
    console.log(vote);
  });

  // fetch(`http://localhost:3333/contract/history/${contract_id}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // .then(response => response.json())
  // .then(responseBody => console.log(responseBody))
};

exports.saveVote = (blockchainId, votable_contract_id, choice) => {
  // Check if user has already voted on the votable, if so update that vote
  // If the user has not already voted on the votable, create a vote
  // return {
  //   status: 'Success',
  //   error: null
  // };
  return new Promise((resolve, reject) => {
    return Vote.create({
      user_id: blockchainId,
      votable_id: votable_contract_id,
	    choice: choice
    }, (err, newVote) => {
      resolve(newVote);
    });
  });
};

exports.getVotesGroupByState = contract_id => {
	console.log(contract_id);
	const getVotes = new Promise((resolve, reject) => {
		fetch(`http://10.33.148.54:3333/contract/history/${contract_id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(responseBody => {
			// { data: { value: { addresses: [], response: [] } } }
			const {
				addresses,
				response
			} = responseBody.data.value;
			console.log('response '+response);

			resolve(response.map((res, index) => {
				return {
					blockchainId: addresses[index],
					choice: res
				}
			}))
			.catch(error => {
				reject(error);
			})
		})
	});

	getVotes.then(() => {}).catch(() => {});

	const getCitizens = new Promise((resolve, reject) => {

	});
};

const fetch = require('node-fetch');
const db = require('../mongo/config/database');
const votable_data = require('./votables');
const csv = require('csvtojson');
const labels = require('./conversions');
const Votable = require('../mongo/models/votable_model');
const Citizen = require('../mongo/models/citizen_model');
const sequential = require('promise-sequential');

const createVotable = (model, votable) => new Promise((resolve, reject) => {
	model.create(votable, (err, newVotable) => {
		if (err) return reject(err);

		resolve(newVotable);
	});
});

const createVotables = (votable_model, votables) =>
	sequential(votables.map((votable, index) => {
		return async () => {
			await sleep(2000);

			return fetch('http://localhost:3333/contract/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					itemID: index,
					responses: votable.choices
				})
			})
				.then(response => response.json())
				.then(response => {
					// { data: { minedAddress: '' } }
					console.log(response);
					votable.contract_id = response.data.minedAddress;

					delete votable.col;
					return createVotable(votable_model, votable);
				});
		}
	}));

const createCitizen = (citizen_model, citizen) => new Promise((resolve, reject) => {
	fetch('http://localhost:3333/create/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(response => {
			citizen.blockchainID = response.newUserAddress;

			citizen_model.create(citizen, (error, newCitizen) => {
				resolve(newCitizen);
			});
		})
		.catch(error => {
			reject(error);
		})
});

const createVote = vote =>
	fetch('http://localhost:3333/contract/vote', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(vote)
	});

const createVotes = (votables, voterAddress, choices)  =>
	sequential(votables.map((votable, index) => {
		return async () => {
			await sleep(2000);

			return createVote({
				voterAddress,
				contractAddress: votable.contract_id,
				response: choices[index]
			})
		}
	}));


const convertDemographic = (key, row) => {
  let data = row[key];
  data--;
  return data > labels[key].length || data < 0 || isNaN(data) ? "Don't Know" : labels[key][data];
};

const convertChoice = (key, row, choices) => {
  let data = row[key];
  data--;
  return data > choices.length || data < 0 || isNaN(data) ? "Don't Know" : choices[data];
};

db.connect().then(async (db) => {
  /*******************************************************
   *******************************************************
   *    Load citizens + votables from dataset            *
   *******************************************************
   *******************************************************/
  let temp_votables = votable_data.votables;
  let votables = votable_data.votables;
  let votable_model = db.model('Votable');
  let citizen_model = db.model('Citizen');

	const input_path = 'citizen.csv';
	const demographics = [
		{key: 'age', no_convert: true },
		{key: 'state'},
		{key: 'sex', name: 'gender'},
		{key: 'irace', name: 'race'},
		{key: 'marital'},
		{key: 'relig', name: 'religion'},
		{key: 'income'},
		{key: 'party'},
		{key: 'citizen', name: 'isCitizen'},
		{key: 'educ2', name: 'educationLevel'},
		{key: 'ideo', name: 'ideology'}
  ];

	createVotables(votable_model, votables)
		.then(voteableResults => {
			console.log(voteableResults);

			csv().fromFile(input_path)
				.on('json', row => {
						const citizen = {
							demographicInfo: {}
						};

						for (let col of demographics) {
							const col_name = col.name != null ? col.name : col.key;

							citizen.demographicInfo[col_name] = col.no_convert
								? row[col.key]
								: convertDemographic(col.key, row);
						}

						createCitizen(citizen_model, citizen)
							.then(newCitizen => {

								const userChoices = temp_votables.map(votable => {
									return convertChoice(votable.col, row, votable.choices);
								});

								return createVotes(votables, newCitizen.blockchainID, userChoices);
							})
							.then(voteResults => {
								console.log('SUCCESS');
							})
							.catch(error => {
								console.log(error);
							});
				});
		})
		.catch(error => {
			console.log(error);
		});
});

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}
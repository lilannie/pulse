const db = require('../mongo/config/database');
const votable_data = require('./votables');
const csv = require('csvtojson');
const labels = require('./conversions');
const Votable = require('../mongo/models/votable_model');
const Citizen = require('../mongo/models/citizen_model');
const Vote = require('../mongo/models/vote_model');

const createVotable = votable => new Promise((resolve, reject) => {
	Votable.create(votable, (error, newVotable) => {
		if (error) return reject(error);

		resolve(newVotable);
	});
});

const createVotables = votables =>
	Promise.all(votables.map((votable, index) => {
		delete votable.col;

		return createVotable(votable);
	}));

const createCitizen = citizen => new Promise((resolve, reject) => {
	Citizen.create(citizen, (error, newCitizen) => {
		if (error) return reject(error);

		resolve(newCitizen);
	});
});

const createVote = vote => new Promise((resolve, reject) => {
	Vote.create(vote, (error, newVote) => {
		resolve(newVote);
	});
});

const createVotes = (votables, citizen_id, choices)  =>
	Promise.all(votables.map((votable, index) => {
		return createVote({
			citizen_id,
			votable_id: votable._id,
			choice: choices[index]
		})
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

	createVotables(votables)
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

					createCitizen(citizen)
						.then(newCitizen => {

							const userChoices = temp_votables.map(votable => {
								return convertChoice(votable.col, row, votable.choices);
							});

							return createVotes(votables, newCitizen._id, userChoices);
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
const csv = require('csvtojson');
const labels = require('./conversions');
const mongoose = require('mongoose');
const votable_data = require('./votables');
const db = require('../mongo/config/database');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');

db.connect().then(db => {
	console.log('Connected');

	const votables = votable_data.votables;
	const input_path = 'citizen.csv';
	const demographics = [
		{ key: 'age', no_convert: true },
		'state',
		'sex',
		'irace',
		'marital',
		'relig',
		'income',
		'party',
		'citizen',
		'educ2',
		'ideo'
	];

	db.model('Votable').insertMany(votables, (error, doc) => {
		console.log(error, doc);
	});

	// /* Return/select all votables in order to obtain votable ID for votes */
	//
	// let citizens = [];
	// csv()
	// 	.fromFile(input_path)
	// 	.on('json', row => {
	// 		let citizen_data = {};
	//
	// 		for (prop of demographics) {
	// 			if (prop.no_convert) {
	// 				citizen_data[prop.key] = row[prop.key];
	// 			} else {
	// 				citizen_data[prop] = convertDemographic(prop, row);
	// 			} // end if dont convert
	// 		} // end foreach prop
	//
	// 		/* TODO: Insert Citizen into MongoDB
	// 		get citizen_id as return value and use for vote */
	// 		citizens.push(citizen_data);
	//
	// 		for (votable of votables) {
	// 			let choices = votable.choices;
	// 			let choice = convertChoice(votable.col, row, choices);
	//
	// 			/* TODO: Store vote in Blockchain???? */
	// 			let vote = {
	// 				citizen_id: 0,
	// 				votable_id: 0,
	// 				choice: choice
	// 			};
	// 			//console.log(vote);
	// 		} // end for loop over votables
	// 		//process.exit();
	// 	});
	//
	// setTimeout(() => {
	// 	db.collection.insertMany(citizens);
	// }, 20000)
	//
	// const convertDemographic = (key, row) => {
	// 	let data = row[key];
	// 	data--;
	// 	return data > labels[key].length || data < 0 || isNaN(data) ? "Don't Know" : labels[key][data];
	// };
	//
	// const convertChoice = (key, row, choices) => {
	// 	let data = row[key];
	// 	data--;
	// 	return data > choices.length || data < 0 || isNaN(data) ? "Don't Know" : choices[data];
	// };
});



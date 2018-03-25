const fetch = require('node-fetch');
const mongoose = require('mongoose');
const nlp = require('compromise');
const db = require('../mongo/config/database');
const votable_data = require('./votables');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');
const csv = require('csvtojson');
const labels = require('./conversions');
const Votable = require('../mongo/models/citizen_model');

const createVotable = (model, votable) => new Promise((resolve, reject) => {
	model.create(votable, (err, newVotable) => {
		if (err) return reject(err);

		resolve(newVotable);
	});
});

const createVotables = (votable_model, votables) =>
	Promise.all(votables.map((votable, index) => {
		return fetch('http://localhost:3333/contract/create', {
			method: "POST",
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
		.then(resultArray => {
			console.log(votables[0]);

			// csv().fromFile(input_path)
			// 	.on('json', row => {
			//
			// 	});
		})
		.catch(error => {
			console.log(error);
		});



  //
  // for(let i = 0; i < votables.length; i++) {
  //   let votable = votables[i];
  //
  //   let choices = votable.choices;
  //   let votable_id = 0;
  //
  //   /* Create the blockchain contract for each votable */
  //   let contract = {
  //     itemID: i,
  //     responses: choices
  //   };
  //
  //   request.post({
  //     url: 'http://localhost:3333/contract/create',
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(contract)
  //   }, (error, data) => {
  //     if(!data || error != null) return;
  //
  //     let json = JSON.parse(data.body);
  //     votable.contract_id = json.data.minedAddress;
  //
  //     delete votable.col;
  //     console.log(votable);
  //     db.model('Votable').create(votable, (error, new_votable) => {
  //       votable = new_votable;
  //
  //       const convertDemographic = (key, row) => {
  //         let data = row[key];
  //         data--;
  //         return data > labels[key].length || data < 0 || isNaN(data) ? "Don't Know" : labels[key][data];
  //       };
  //
  //       const convertChoice = (key, row, choices) => {
  //         let data = row[key];
  //         data--;
  //         return data > choices.length || data < 0 || isNaN(data) ? "Don't Know" : choices[data];
  //       };
  //
  //       csv().fromFile(input_path).on('json', row => {
  //         // loop over content of .csv file
  //         let citizen_data = { blockchainID: 0, demographicInfo: {} };
  //
  //         // loop over each demographic prop
  //         for (prop of demographics) {
  //           let real_name = '';
  //
  //           if(prop.name != null){
  //             real_name = prop.name;
  //           }else{
  //             real_name = prop.key;
  //           }
  //
  //           if (prop.no_convert) {
  //             citizen_data.demographicInfo[real_name] = row[prop.key];
  //           } else {
  //             citizen_data.demographicInfo[real_name] = convertDemographic(prop.key, row);
  //           } // end if dont convert
  //         } // end foreach prop
  //
  //         // make a get request to create a blockchain user
  //         request.get('http://localhost:3333/create/user', async (error, data) => {
  //           if(!data || error != null) return;
  //
  //           let json = JSON.parse(data.body);
  //           let newUserAddress = json.newUserAddress;
  //           citizen_data.blockchainID = newUserAddress;
  //
  //           console.log(citizen_data);
  //           /* Create a citizen */
  //           db.model('Citizen').create(citizen_data).then(citizen => {
  //             /* Handle votes for a citizen */
  //             let choices = votable.choices;
  //             let choice = convertChoice(temp_votables[i].col, row, choices);
  //             let votable_id = votable._id;
  //
  //             /* Store vote in Blockchain */
  //             let vote = {
  //               voterAddress: newUserAddress,
  //               contractAddress: votable.contract_id,
  //               response: choice
  //             };
  //
  //             /* Make a final post request creating the vote */
  //             request.post({
  //                 url: 'http://localhost:3333/contract/vote',
  //                 method: "POST",
  //                 headers: {
  //                   'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify(vote)
  //               }, async (error, doc) => {
  //                 if(!doc || error != null) return;
  //                 console.log('ERROR on request side')
  //                 console.log(error);
  //                 console.log(doc);
  //                 await sleep(1500);
  //             });
  //           });
  //           await sleep(1500);
  //         });
  //       });
  //     });
  //   });
  //   await sleep(1500);
  // }// end foreach loop over votables
});

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

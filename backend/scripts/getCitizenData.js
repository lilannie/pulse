const csv = require('csvtojson');
const labels = require('./conversions');
const mongoose = require('mongoose');
const votable_data = require('./votables');
const db = require('../mongo/config/database');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');
const Votable = require('../mongo/models/citizen_model');

db.connect().then(db => {
	console.log('Connected');

	const votables = votable_data.votables;
	const input_path = 'citizen.csv';
	const demographics = [
		{ key: 'age', no_convert: true },
		{key: 'state'},
		{key: 'sex', name: 'gender'},
		{key: 'irace', name: 'race'},
		{key: 'marital'},
		{key: 'relig', name: 'religion'},
		{key: 'income'},
		{key: 'party'},
		{key: 'citizen', name: 'is_citizen'},
		{key: 'educ2', name: 'educationLevel'},
		{key: 'ideo', name: 'ideology'}
	];

  /* Insert votables */
	db.model('Votable').insertMany(votables, (error, doc) => {
		//console.log(error, doc);
	});

	/* Return/select all votables in order to obtain votable ID for votes */
  
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
  
  // let citizens = [];
	csv()
		.fromFile(input_path)
		.on('json', row => {
			let citizen_data = {blockchainID: 0, demographicInfo: {}};
      
			for (prop of demographics) {
        let real_name = '';
        
        if(prop.name != null){
          real_name = prop.name;
        }else{
          real_name = prop.key;
        }

				if (prop.no_convert) {
					citizen_data.demographicInfo[real_name] = row[prop.key];
				} else {
					citizen_data.demographicInfo[real_name] = convertDemographic(prop.key, row);
				} // end if dont convert
			} // end foreach prop
      
      db.model('Citizen').create(citizen_data).then(result => {
        console.log(result);
      });
  
      // VOTES 
    
			for (votable of votables) {
				let choices = votable.choices;
				let choice = convertChoice(votable.col, row, choices);
	
				/* TODO: Store vote in Blockchain???? */
				let vote = {
					citizen_id: 0,
					votable_id: 0,
					choice: choice
				};
				//console.log(vote);
			} // end for loop over votables
     
    });	
});




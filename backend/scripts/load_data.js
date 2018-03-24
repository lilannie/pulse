const request = require('request-promise');
const mongoose = require('mongoose');
const nlp = require('compromise');
const db = require('../mongo/config/database');
const votable_data = require('./votables');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');
const csv = require('csvtojson');
const labels = require('./conversions');
const Votable = require('../mongo/models/citizen_model');

db.connect().then(db => {
/*******************************************************
 *    Load votables from web API                       *
 ******************************************************/
  const base_url = 'https://elections.huffingtonpost.com/pollster/api/v2/';

  let cursor = 25000;
  let cursors = [];
  let all_questions = [];
  let descriptions = [];

  const getVotables = async cursor => {
    let results = await request(`${base_url}polls?cursor=${cursor}`);
    let json = JSON.parse(results);
    return json;
  };

  getVotables(cursor).then(json => {
    if (!cursors.includes(cursor)) {
      let polls = json.items;

      if (polls) {
        for (poll of polls) {
          let poll_questions = poll.poll_questions;

          for (item of poll_questions) {
            // pull out the question and the response data
            let description = item.text;
            let responses = item.question.responses;
            let sample_pop = item.sample_subpopulations;

            if (description && !all_questions.includes(description)) {
              all_questions.push(description);

              let choices = [];
              let votes = [];
              for (sample of sample_pop) {
                let sample_responses = sample.responses;

                for (sample_response of sample_responses) {
                  var vote = {
                    choice: sample_response.text,
                    count: sample_response.value
                  };

                  if (!choices.includes(vote.choice)) {
                    choices.push(vote.choice);
                    votes.push(vote);
                  } // end if not duplicate choice
                } // end foreach sample response
              } // end foreach sample

              let votable = {
                description: description,
                choices: choices
              };

              descriptions.push(votable.description);

              // console.log(votes);
              // console.log(votable);
              votable_ctrl.insert(votable);
            } // end if we have a question
          } // end foreach poll questions
        } // end foreach polls
      } // end if we have polls

      // keep track of all cursors so we don't count dupes
      cursors.push(cursor);
    } // end if not a dupe cursor

    // Use nlp to categorize questions and generate a list of topics
    processText(descriptions);
  });
  
  const processText = descriptions => {
    for (let i = 0; i < descriptions.length; i++) {
      // console.log(descriptions[i]);
      // TODO
    }
  };

  /*******************************************************
   *    Load citizens + votables from dataset            *
   ******************************************************/
  let temp_votables = votable_data.votables;
  let votables = votable_data.votables;
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
		{key: 'citizen', name: 'isCitizen'},
		{key: 'educ2', name: 'educationLevel'},
		{key: 'ideo', name: 'ideology'}
	];

  /* Insert votables */
	db.model('Votable').insertMany(votables, (error, doc) => {
    votables = doc;
	});

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
      
      /* Create a citizen */
      db.model('Citizen').create(citizen_data).then(citizen => {
        /* Handle votes for a citizen */
        let citizen_id = citizen._id;

        for(let i = 0; i < votables.length; i++) {
          let votable = votables[i];
          let choices = votable.choices;
          let choice = convertChoice(temp_votables[i].col, row, choices);
          let votable_id = votable._id;
    
          /* Store vote in Blockchain */
          let vote = {
            citizen_id: citizen_id,
            votable_id: votable_id,
            choice: choice
          };
          
          //console.log(vote);
        } // end for loop over votables
    });
  });
});
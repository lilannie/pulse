const csv = require('csvtojson');
const labels = require('./conversions');
const votable_data = require('./votables');
const db = require('../mongo/config/database');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');

db.connect();

const votables = votable_data.votables;
const input_path = 'citizen.csv';
const demographics = [
               {key: 'age', no_convert: true},
               'state', 'sex', 'irace', 'marital', 'relig', 'income', 'party',
               'citizen', 'educ2', 'ideo'
              ];

for(votable of votables) {
  let col =  votable.col;
  delete votable.col;
  
  //console.log(votable);
  /* Insert votable into Mongo */
  votable_ctrl.insert(votable);
  votable.col = col;
}// end foreach votable

/* Return/select all votables in order to obtain votable ID for votes */

csv().fromFile(input_path).on('json', (row) => { 
  let citizen_data = {};

  for(prop of demographics) {
    
    if(prop.no_convert) {
      citizen_data[prop.key] = row[prop.key];
    }else{
      citizen_data[prop] = convertDemographic(prop, row);
    }// end if dont convert

  }// end foreach prop
  
  /* TODO: Insert Citizen into MongoDB 
     get citizen_id as return value and use for vote */
  //console.log(citizen_data);

  for(votable of votables){
    let choices = votable.choices;
    let choice = convertChoice(votable.col, row, choices);

    /* TODO: Store vote in Blockchain???? */
    let vote = {
      citizen_id: 0,
      votable_id: 0,
      choice: choice
    };

    //console.log(vote);
  }// end for loop over votables

  process.exit();
});

const convertDemographic = (key, row) => {
  let data = row[key];
  data--;
  return (data > labels[key].length || data < 0 || isNaN(data)) ? "Don't Know" : labels[key][data];
};

const convertChoice = (key, row, choices) => {
  let data = row[key];
  data--;
  return (data > choices.length || data < 0 || isNaN(data)) ? "Don't Know" : choices[data];
};

db.close();
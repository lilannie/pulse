const Votable = require('../models/votable_model');

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

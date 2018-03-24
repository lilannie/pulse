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

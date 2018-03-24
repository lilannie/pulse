const Votable = require('../models/votable');

exports.findAll = (req, res) => {
  Votable.find((err, results) => {
    if (err) {
      console.err('Oh no! Something Went Wrong!');
      res.status(500).send('Unable to retrieve Votables!');
    } else {
      res.send(results);
    }
  });
};

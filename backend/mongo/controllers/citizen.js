const Citizen = require('../models/citizen');

exports.create = (req, res) => {
  let citizen = new Citizen({
    userID: req.body.userID,
    name: req.body.name,
    demographicInfo: {
      age: req.body.demographicInfo.age,
      gender: req.body.demographicInfo.gender,
      party: req.body.demographicInfo.party,
      education: req.body.demographicInfo.education,
      income: req.body.demographicInfo.income,
      address: {
        street: req.body.demographicInfo.address.street,
        city: req.body.demographicInfo.address.city,
        state: req.body.demographicInfo.address.state,
        zip: req.body.demographicInfo.address.zip
      }
    }
  });

  citizen.save((err, result) => {
    if (err) {
      console.err('Oh no! Something Went Wrong!');
      res.status(500).send('Unable to Create Citizen');
    } else {
      res.send(result);
    }
  });
};

exports.findAll = (req, res) => {
  Citizen.find((err, results) => {
    if (err) {
      console.err('Oh no! Something Went Wrong!');
      res.status(500).send('Unable to Find Citizens');
    } else {
      res.send(results);
    }
  });
};

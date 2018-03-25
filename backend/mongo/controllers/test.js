let votable_ctrl = require('./votable_ctrl');
const db = require('../config/database');

db.connect().then( (db) => {
  votable_ctrl.getVoterHistory('5ab7675a9f95053029f022df')
});
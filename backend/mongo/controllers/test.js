let votable_ctrl = require('./votable_ctrl');
const db = require('../config/database');

db.connect().then( (db) => {
  votable_ctrl.saveVote({
    user_id: '3',
    votable_id: '5',
    choice: 'test'
  }).then(data => {
    console.log(data);
  }).catch(error => {
    console.log(error);
  })
});
const Topic = require('../mongo/models/topic_model');
const db = require('../mongo/config/database');
// A script that manually inserts the following list of topics...
/**
 * [
 * {_custom_id: 1, title: Gun Control},
 * {_custom_id: 2, title: Trump},
 * {_custom_id: 3, title: Trade War},
 * {_custom_id: 4, title: Immigration},
 * {_custom_id: 5, title: Taxes},
 * {_custom_id: 6, title: Russian Hacking},
 * {_custom_id: 7, title: Facebook Data},
 * {_custom_id: 8, title: Elections}
 * ]
 */

db.connect().then(() => {
  Topic.insertMany([
    { _custom_id: 1, title: 'Gun Control' },
    { _custom_id: 2, title: 'Trump' },
    { _custom_id: 3, title: 'Trade War' },
    { _custom_id: 4, title: 'Immigration' },
    { _custom_id: 5, title: 'Taxes' },
    { _custom_id: 6, title: 'Russian Hacking' },
    { _custom_id: 7, title: 'Facebook Data' },
    { _custom_id: 8, title: 'Elections' }
  ]).then(result => {
    console.log('Added Topics!');
  });
});

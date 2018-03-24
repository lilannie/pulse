const Topic = require('../mongo/models/topic_model');

// A script that manually inserts the following list of topics...

/**
 * [
 * {id: , title: Gun Control},
 * {id: , title: Trump},
 * {id: , title: Trade War},
 * {id: , title: Immigration},
 * {id: , title: Taxes},
 * {id: , title: Russian Hacking},
 * {id: , title: Facebook Data},
 * {id: , title: Elections}
 * ]
 */

Topic.insertMany([
  { id: 1, title: 'Gun Control' },
  { id: 2, title: 'Trump' },
  { id: 3, title: 'Trade War' },
  { id: 4, title: 'Immigration' },
  { id: 5, title: 'Taxes' },
  { id: 6, title: 'Russian Hacking' },
  { id: 7, title: 'Facebook Data' },
  { id: 8, title: 'Elections' }
]).then(result => {
  console.log(result);
});

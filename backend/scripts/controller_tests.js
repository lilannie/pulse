const comment_ctrl = require('../mongo/controllers/comment_ctrl');
const topic_ctrl = require('../mongo/controllers/topic_ctrl');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');

let testComment = {
  _creator_id: 1,
  content: 'Quinn made this really cool comment!',
  rank: 0,
  date: Date.now()
};

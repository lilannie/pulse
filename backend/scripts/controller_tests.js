const comment_ctrl = require('../mongo/controllers/comment_ctrl');
const topic_ctrl = require('../mongo/controllers/topic_ctrl');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');
const post_ctrl = require('../mongo/controllers/post_ctrl');
const db = require('../mongo/config/database');

let testComment = {
  creator_id: 2,
  content: '~This is a super cool comment~',
  rank: 0,
  date: Date.now()
};

let post_one = {
  content: 'Facebook Scandal!',
  comments: ['omg', "can't believe this", 'twitter is way cooler'],
  topic: ['election'],
  location: 'CA',
  rank: 0,
  date: Date.now()
};

let post_two = {
  content: 'Russian Hacking Scandal Changes Everything',
  comments: ['wow', 'crazy', 'yikes!'],
  topic: ['russian hacking'],
  location: 'NY',
  rank: 0,
  date: Date.now()
};

let votable = {
  contract_id: 12345678,
  title: 'DACA',
  description: 'Defend DACA',
  choices: ['I agree', 'I do not agree'],
  topics: ['immigration']
};

db.connect().then(async db => {
  // post_ctrl.createPost(post_one);
  // post_ctrl.createPost(post_two);
  // comment_ctrl.createComment(testComment);
  votable_ctrl.insert(votable);
});

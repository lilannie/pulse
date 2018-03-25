const Topic = require('../models/topic_model');
const Post = require('../models/post_model');

exports.getAllTopics = () => new Promise((resolve, reject) => {
  Topic.find((err, results) => {
    if (err) {
      console.log(err.stack);
      return reject(err);
    }
    console.log(results);
    resolve(results);
  });
});

exports.getTopicPosts = topicID => {
	Post.findAll({
		topics
	})
  // return [
  //     {
  //       _id: 1,
  //       content: 'Post Content',
  //       rank: 1,
  //       date_created: '03/24/2018 06:33:00',
  //       location: {},
  //       comments: [
  //         {
  //           _id: 1,
  //           content: 'Comment Content',
  //           rank: 1,
  //           date_created: '03/24/2018 06:33:00'
  //         }
  //       ]
  //     },
  //     {
  //       _id: 2,
  //       content: 'Post Content',
  //       rank: 2,
  //       date_created: '03/24/2018 06:33:00',
  //       location: {},
  //       comments: [
  //         {
  //           _id: 1,
  //           content: 'Comment Content',
  //           rank: 1,
  //           date_created: '03/24/2018 06:33:00'
  //         }
  //       ]
  //     },
  //     {
  //       _id: 3,
  //       content: 'Post Content',
  //       rank: 3,
  //       date_created: '03/24/2018 06:33:00',
  //       location: {},
  //       comments: [
  //         {
  //           _id: 1,
  //           content: 'Comment Content',
  //           rank: 1,
  //           date_created: '03/24/2018 06:33:00'
  //         }
  //       ]
  //     },
  //     {
  //       _id: 4,
  //       content: 'Post Content',
  //       rank: 4,
  //       date_created: '03/24/2018 06:33:00',
  //       location: {},
  //       comments: [
  //         {
  //           _id: 1,
  //           content: 'Comment Content',
  //           rank: 1,
  //           date_created: '03/24/2018 06:33:00'
  //         }
  //       ]
  //     },
  //     {
  //       _id: 5,
  //       content: 'Post Content',
  //       rank: 5,
  //       date_created: '03/24/2018 06:33:00',
  //       location: {},
  //       comments: [
  //         {
  //           _id: 1,
  //           content: 'Comment Content',
  //           rank: 1,
  //           date_created: '03/24/2018 06:33:00'
  //         }
  //       ]
  //     }
  //   ];
};

// TODO
exports.getTopicVotables = topicID => {
  // return [
  //     {
  //       _contract_id: 1,
  //       creator: {
  //         firstName: 'Annie',
  //         lastName: 'Steenson'
  //       },
  //       title: 'Votable Title',
  //       description: 'Votable Description',
  //       choices: ['Agree', 'Disagree', 'Neutral'],
  //       rank: 1
  //     },
  //     {
  //       _contract_id: 2,
  //       creator: {
  //         firstName: 'Annie',
  //         lastName: 'Steenson'
  //       },
  //       title: 'Votable Title',
  //       description: 'Votable Description',
  //       choices: ['Agree', 'Disagree', 'Neutral'],
  //       rank: 2
  //     },
  //     {
  //       _contract_id: 3,
  //       creator: {
  //         firstName: 'Annie',
  //         lastName: 'Steenson'
  //       },
  //       title: 'Votable Title',
  //       description: 'Votable Description',
  //       choices: ['Agree', 'Disagree', 'Neutral'],
  //       rank: 3
  //     },
  //     {
  //       _contract_id: 4,
  //       creator: {
  //         firstName: 'Annie',
  //         lastName: 'Steenson'
  //       },
  //       title: 'Votable Title',
  //       description: 'Votable Description',
  //       choices: ['Agree', 'Disagree', 'Neutral'],
  //       rank: 4
  //     },
  //     {
  //       _contract_id: 5,
  //       creator: {
  //         firstName: 'Annie',
  //         lastName: 'Steenson'
  //       },
  //       title: 'Votable Title',
  //       description: 'Votable Description',
  //       choices: ['Agree', 'Disagree', 'Neutral'],
  //       rank: 5
  //     }
  //   ];
};

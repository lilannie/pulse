const Topic = require('../models/topic_model');
const Post = require('../models/post_model');
const Votable = require('../models/votable_model');

exports.getAllTopics = () => new Promise((resolve, reject) => {
  Topic.find({}, (error, results) => {
    if (error) {
      return reject(error);
    }
    resolve(results);
  });
});

exports.getTopicPosts = params => new Promise((resolve, reject) => {
	Post.findAll({
		topics: params.topic_id
	}, (error, results) => {
		if (error) {
			return reject(error);
		}

		resolve(results);
	});
});

exports.getTopicVotables = params => new Promise((resolve, reject) => {
  Votable.findAll({
	  topics: params.topic_id
  }, (error, results) => {
	  if (error) {
		  return reject(error);
	  }

	  resolve(results);
  });
});

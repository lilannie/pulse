const Comment = require('../models/comment_model');
const Post = require('../models/post_model');

exports.createComment = ({ topic_id, comment }) => new Promise((resolve, reject) => {
	let comm = new Comment({
		_creator_id: comment._creator_id,
		content: comment.content,
		rank: 0,
		date: Date.now()
	});

  Post.findById(topic_id, (error, post) => {
	  post.set('comments', post.get('comments').push(comm));
	  post.markModified('comments');
	  post.save((err, post_saved) => {
		  if (error) {
			  return reject(error);
		  }

		  resolve(post_saved);
	  });
  });
});

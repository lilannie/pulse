const Comment = require('../models/comment_model');

exports.createComment = comment => {
  let comment = new Comment({
    _creator_id: comment._creator_id,
    content: comment.content,
    rank: 0,
    date: Date.now()
  });

  comment.save((err, response) => {
    if (err) {
      console.log(err.stack);
    }
    console.log('Comment Added Successfully!');
  });

  return {
    status: 'Success',
    error: null
  };
};

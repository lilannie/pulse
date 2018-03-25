const Comment = require('../models/comment_model');

exports.createComment = comment =>
  new Promise((resolve, reject) => {
    let comm = new Comment({
      _creator_id: comment._creator_id,
      content: comment.content,
      rank: 0,
      date: Date.now()
    });

    comm.save((err, response) => {
      if (err) {
        console.log(err.stack);
        return reject(err);
      }
      console.log('Comment Added Successfully!');
      return resolve(response);
    });
  });

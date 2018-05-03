const Post = require('../models/post_model');

exports.createPost = post => new Promise((resolve, reject) => {
  let p = new Post({
    content: post.content,
    comment_ids: post.comment_ids,
    topics: [String],
    location: String,
    rank: 0,
    date: Date.now()
  });

  p.save((err, response) => {
    if (err) {
      return reject(err);
    }

    return resolve(response);
  });
});

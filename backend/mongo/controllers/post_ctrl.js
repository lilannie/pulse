const Post = require('../models/post_model');

exports.createPost = post =>
  new Promise((resolve, reject) => {
    let p = new Post({
      content: post.content,
      comment_ids: post.comment_ids,
      topic: post.topic,
      location: post.location,
      rank: 0,
      date: Date.now()
    });

    p.save((err, response) => {
      if (err) {
        console.log(err.stack);
        return reject(err);
      }
      console.log('Post Added Successfully!');
      return resolve(response);
    });
  });

const Post = require('../models/post_model');

<<<<<<< HEAD
exports.createPost = post => new Promise((resolve, reject) => {
  let p = new Post({
    content: post.content,
    comment_ids: post.comment_ids,
    topics: [String],
    location: String,
    rank: 0,
    date: Date.now()
  });
=======
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
>>>>>>> f1be63f798270cdd4a14b3fb16c45afbf6a91407

  p.save((err, response) => {
    if (err) {
      console.log(err.stack);
      return reject(err);
    }
    console.log('Post Added Successfully!');
    return resolve(response);
  });
});

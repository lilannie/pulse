const BrainJSClassifier = require('natural-brain');
const classifier = new BrainJSClassifier();
const nlp = require('keyword-extractor');
const db = require('../mongo/config/database');
const Votable = require('../mongo/models/votable_model');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');

let topics = [];

db.connect().then(db => {
  db.model('Votable').find({}, (err, doc) => {
    let descriptions = [];
    for (let i = 0; i < doc.length; i++) {
      descriptions.push(doc[i].description);
    }
    for (let i = 0; i < descriptions.length; i++) {
      let keywords = nlp.extract(descriptions[i], {
        language: 'english',
        remove_digits: true,
        remove_duplicates: true
      });
      topics.push(keywords);
    }
    generateTopics(topics);
  });
});

const generateTopics = topics => {
  const words = [];
  const count = [];

  topics.forEach(votable_topic => {
    votable_topic.forEach(topic => {
      let index = words.indexOf(topic);
      if (index >= 0) {
        const temp = count[index];
        temp.count += 1;
      } else {
        count.push({
          topic,
          count: 1
        });
      }
    });
  });

  // Sort results by votes
  count.sort((obj1, obj2) => obj2.count - obj1.count);

  console.log(count);

  // Only display topics with more than 5 votes
  const result = count.filter(ct => ct.count > 5);
};

votable_ctrl.getVotableIDs();

const BrainJSClassifier = require('natural-brain');
const classifier = new BrainJSClassifier();
const nlp = require('keyword-extractor');
const db = require('../mongo/config/database');
const Votable = require('../mongo/models/votable_model');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');

db.connect().then(db => {
	// Get all Votables
  db.model('Votable').find({}, (err, docs) => {
  	console.log(docs[0]);

	  const nlp_options = {
		  language: 'english',
		  remove_digits: true,
		  remove_duplicates: true
	  };

	  // Find keywords of each votable
	  const votable_keywords = docs.map(doc => {
		  const {
			  contract_id,
			  description
		  } = doc;

		  return {
			  contract_id,
			  description,
			  keywords: nlp.extract(description, nlp_options)
		  }
	  });

	  // Find the top ten keywords
	  const top_topics = findTopTopics(votable_keywords);

	  // For each votable, add store keyword if they contain a top ten keyword
	  votable_keywords.forEach(votable_keyword => {
	  	const {
	  		contract_id,
			  keywords
	  	} = votable_keyword;
	  	const new_keywords = [];

	  	top_topics.forEach(topic => {
	  		if (keywords.indexOf(topic) >= 0) new_keywords.push(topic);
		  });

		  if (new_keywords.length > 0) {
			  db.model('Votable').findById(contract_id, (err, votable) => {
			  	if (!err) {
			  		votable.keywords = new_keywords;
					  votable.save((err, updatedVotable) => {});
				  }
			  })
		  }
	  });

  });
});

const findTopTopics = topics => {
  const topics = [];
  let count = [];

  topics.forEach(votable => {
	  votable.keywords.forEach(keyword => {
      let index = topics.indexOf(keyword);

      if (index >= 0) {
        const temp = count[index];
        temp.count += 1;
      }

      else {
      	topics.push(keyword);
        count.push({
	        keyword,
          count: 1
        });
      }
    });
  });

  // Sort results by keyword occurences in descending order
  count.sort((obj1, obj2) => obj2.count - obj1.count);

  const ignoredKeywords = ['today', 'vote', 'had', 'candidate', 'presidential'];

  count = count.slice(0, 15);

  console.log(count);

  count = count.filter(obj => ignoredKeywords.indexOf(obj.keyword) >= 0);

  return count.map(obj => obj.keyword);
};

votable_ctrl.getVotableIDs();

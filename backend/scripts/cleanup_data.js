const request = require('request');
const fs = require('fs');

const base_url = 'https://elections.huffingtonpost.com/pollster/api/v2/';

let cursor = 28001;
let cursors = [];
let all_questions = [];

const getItems = cursor => {
  //console.log('cursor'+cursor);
  return new Promise((resolve, reject) => {
    request(base_url + 'polls?cursor=' + cursor, (error, response, body) => {
      if (error || body == undefined || body == null) {
        reject(new Error('End of reading input'));
      }

      try {
        body = JSON.parse(body);
      } catch (e) {
        reject(new Error());
      }

      if (!cursors.includes(cursor)) {
        let polls = body.items;

        if (polls) {
          for (poll of polls) {
            let poll_questions = poll.poll_questions;

            for (item of poll_questions) {
              // pull out the question and the response data
              let description = item.text;
              let responses = item.question.responses;
              let sample_pop = item.sample_subpopulations;

              if (description && !all_questions.includes(description)) {

                let choices = [];
                for (sample of sample_pop) {
                 
                  let sample_responses = sample.responses;

                  for(sample_response of sample_responses){
                    var vote = {
                      choice: sample_response.text,
                      count: sample_response.value
                    }

                    if(!choices.includes(vote.choice)){
                      choices.push(vote.choice);
                      console.log(vote);
                    }// end if not duplicate choice

                  }// end foreach sample response
                  
                }// end foreach sample

                let votable = {
                  //id: 5,
                  description: description,
                  choices: choices
                };

                console.log(votable);

              }// end if we have a question

            } // end foreach poll questions

          } // end foreach polls

        }// end if we have polls

        // keep track of all cursors so we don't count dupes
        cursors.push(cursor);
      }// end if not a dupe cursor

      setTimeout(() => {
        resolve(body.next_cursor);
      }, 5000);
    });
  });
};

//while(cursor > 1) {
getItems(cursor).catch(error => {
  console.log(error);
  process.exit();
});
cursor -= 15;
//}

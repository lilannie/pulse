let request = require('request');
var fs = require('fs');

let base_url = 'https://elections.huffingtonpost.com/pollster/api/v2/';

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
        //console.log(body.next_cursor);
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
                // console.log(question);

                //let id = 5;
                let votable = {
                  //id: 5,
                  description: description,
                  responses: responses.map(response => response.name)
                };

                for (sample of sample_pop) {
                  console.log(sample);
                }

                console.log(votable);
              }
            } // end foreach poll questions
          } // end foreach polls
        }

        // keep track of all cursors so we don't count dupes
        cursors.push(cursor);
      }

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

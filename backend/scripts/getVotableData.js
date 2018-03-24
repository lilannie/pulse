const request = require('request');
const mongoose = require('mongoose');
const fs = require('fs');
const db = require('../mongo/config/database');
const votable_ctrl = require('../mongo/controllers/votable_ctrl');

db.connect();

const base_url = 'https://elections.huffingtonpost.com/pollster/api/v2/';

let cursor = 25000;
let cursors = [];
let all_questions = [];

const getItems = cursor => {
  return new Promise((resolve, reject) => {
    request(base_url + 'polls?cursor=' + cursor, (error, response, body) => {
      if (error || body === undefined || body === null) {
        return reject(new Error('End of reading input'));
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
                all_questions.push(description);

                let choices = [];
                let votes = [];
                for (sample of sample_pop) {
                  let sample_responses = sample.responses;

                  let sample_name = sample.name;
                  console.log(sample_name);

                  for (sample_response of sample_responses) {
                    var vote = {
                      choice: sample_response.text,
                      count: sample_response.value
                    };

                    if (!choices.includes(vote.choice)) {
                      choices.push(vote.choice);
                      votes.push(vote);
                    } // end if not duplicate choice
                  } // end foreach sample response
                } // end foreach sample

                let votable = {
                  description: description,
                  choices: choices
                };

                // console.log(votes);
                // console.log(votable);
                votable_ctrl.insert(votable);
              } // end if we have a question
            } // end foreach poll questions
          } // end foreach polls
        } // end if we have polls

        // keep track of all cursors so we don't count dupes
        cursors.push(cursor);
      } // end if not a dupe cursor

      setTimeout(() => {
        resolve(body.next_cursor);
      }, 5000);
    });
  });
};

getItems(cursor).catch(error => {
  console.log(error);
  process.exit();
});

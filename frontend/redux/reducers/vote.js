import { createActionAsync, createReducerAsync } from 'redux-act-async';

const get_voter_history = params => {
	return new Promise((resolve, reject) => {
		resolve({
			1: 'Agree',
			2: 'Neutral',
			3: 'Disagree'
		});
	});
};

export const get_voter_history_action =
	createActionAsync('GET_VOTER_HISTORY', get_voter_history);

export const voter_history =
	createReducerAsync(get_voter_history_action);

const post_save_vote = (params, callback) => {
	return new Promise((resolve, reject) => {
		resolve({
			status: 'Success',
			error: null
		});

		callback();
	});
};

export const post_save_vote_action =
	createActionAsync('POST_SAVE_VOTE', post_save_vote);

export const save_vote =
	createReducerAsync(post_save_vote_action);

const get_map_data = contract_id => {
	return new Promise((resolve, reject) => {
		fetch('localhost:8080/api/mongo/vote/getVotesGroupByState', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				contract_id
			})
		})
			.then(response => response.json())
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			})
	});
};

export const get_map_data_action =
	createActionAsync('GET_MAP_DATA_ACTION', get_map_data);

export const map_data =
	createReducerAsync(get_map_data_action);

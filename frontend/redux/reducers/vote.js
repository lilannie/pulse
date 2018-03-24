import { createActionAsync, createReducerAsync } from 'redux-act-async';

const get_voter_history = params => {
	return new Promise((resolve, reject) => {
		resolve({
			1: 'Agree',
			2: 'Neutral',
			3: 'Disagree'
		})
	});
};

export const get_voter_history_action =
	createActionAsync('GET_VOTER_HISTORY', get_voter_history);

export const voter_history =
	createReducerAsync(get_voter_history_action);

const post_save_vote = params => {
	return new Promise((resolve, reject) => {
		resolve({
			status: 'Success',
			error: null
		})
	});
};

export const post_save_vote_action =
	createActionAsync('POST_SAVE_VOTE', post_save_vote);

export const save_vote =
	createReducerAsync(post_save_vote_action);

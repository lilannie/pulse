import { createActionAsync, createReducerAsync } from 'redux-act-async';

const get_topic_votables = params => {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:8080/api/mongo/topic/getTopicVotables', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		})
			.then(response => response.json())
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const get_topic_votables_action =
	createActionAsync('GET_TOPIC_VOTABLE', get_topic_votables);

export const topic_votables =
	createReducerAsync(get_topic_votables_action);

const post_create_votable = params => {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:8080/api/mongo/votable/saveVote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		})
			.then(response => response.json())
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const post_create_votable_action =
	createActionAsync('CREATE_VOTABLE_ACTION', post_create_votable);

export const create_votable =
	createReducerAsync(post_create_votable_action);

const get_votables = () => {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:8080/api/mongo/votable/getVotables', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const get_votables_action =
	createActionAsync('GET_VOTABLES', get_votables);

export const votables =
	createReducerAsync(get_votables_action);
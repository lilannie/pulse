import { createActionAsync, createReducerAsync } from 'redux-act-async';

const get_topic_votables = params => {
	return new Promise((resolve, reject) => {
		resolve([
			{
				_contract_id: 1,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 1
			},
			{
				_contract_id: 2,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 2
			},
			{
				_contract_id: 3,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 3
			},
			{
				_contract_id: 4,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 4
			},
			{
				_contract_id: 5,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 5
			}
		]);
	});
};

export const get_topic_votables_action =
	createActionAsync('GET_TOPIC_VOTABLE', get_topic_votables);

export const topic_votables =
	createReducerAsync(get_topic_votables_action);

const post_create_votable = params => {
	return new Promise((resolve, reject) => {
		fetch('localhost:8080/api/mongo/votable/insert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		})
			.then(response => response.json())
			.then(response => {
				resolve(response);
				callback();
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

const get_votables = params => {
	return new Promise((resolve, reject) => {
		resolve([
			{
				_contract_id: 1,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 1
			},
			{
				_contract_id: 2,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 2
			},
			{
				_contract_id: 3,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 3
			},
			{
				_contract_id: 4,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 4
			},
			{
				_contract_id: 5,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 5
			}
		]);
	});
};

export const get_votables_action =
	createActionAsync('GET_VOTABLES', get_votables);

export const votables =
	createReducerAsync(get_votables_action);
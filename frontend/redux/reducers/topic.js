import { createActionAsync, createReducerAsync } from 'redux-act-async';

const get_topics = () => {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:8080/api/mongo/topic/getAllTopics', {
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

export const get_topics_action =
	createActionAsync('GET_TOPICS', get_topics);

export const topics =
	createReducerAsync(get_topics_action);

const get_topic = () => {
	return new Promise((resolve, reject) => {
		resolve({
			_id: 1,
			title: 'Gun Control'
		});
	});
};

export const get_topic_action =
	createActionAsync('GET_TOPIC', get_topic);

export const topic =
	createReducerAsync(get_topic_action);

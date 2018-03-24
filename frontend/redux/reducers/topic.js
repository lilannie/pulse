import { createActionAsync, createReducerAsync } from 'redux-act-async';

const get_topics = () => {
	return new Promise((resolve, reject) => {
		resolve([
			{
				_id: 1,
				title: 'Gun Control'
			},
			{
				_id: 2,
				title: 'Trump'
			},
			{
				_id: 3,
				title: 'Trade War'
			},
			{
				_id: 4,
				title: 'Immigration'
			},
			{
				_id: 5,
				title: 'Taxes'
			},
			{
				_id: 6,
				title: 'Russian Hacking'
			},
			{
				_id: 7,
				title: 'Facebook Data'
			},
			{
				_id: 8,
				title: 'Taxes'
			}
		]);
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

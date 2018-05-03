import { createActionAsync, createReducerAsync } from 'redux-act-async';

const get_topic_posts = params => {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:8080/api/mongo/topic/getTopicPosts', {
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

export const get_topic_posts_action =
	createActionAsync('GET_TOPIC_POSTS', get_topic_posts);

export const topic_posts =
	createReducerAsync(get_topic_posts_action);

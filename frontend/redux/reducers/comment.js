import { createActionAsync, createReducerAsync } from 'redux-act-async';

const post_create_comment = (params, callback) => {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:8080/api/mongo/comment/createComment', {
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

export const post_create_comment_action =
	createActionAsync('POST_CREATE_COMMENT', post_create_comment);

export const create_comment =
	createReducerAsync(post_create_comment_action);

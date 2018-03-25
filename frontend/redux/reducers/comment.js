import { createActionAsync, createReducerAsync } from 'redux-act-async';

const post_create_comment = (params, callback) => {
	return new Promise((resolve, reject) => {
		resolve({
			status: 'Success',
			error: null
		});

		callback();
	});
};

export const post_create_comment_action =
	createActionAsync('POST_CREATE_COMMENT', post_create_comment);

export const create_comment =
	createReducerAsync(post_create_comment_action);

import { createActionAsync, createReducerAsync } from 'redux-act-async';

const post_save_comment = (params, callback) => {
	return new Promise((resolve, reject) => {
		resolve({
			status: 'Success',
			error: null
		});

		callback();
	});
};

export const post_save_comment_action =
	createActionAsync('POST_SAVE_COMMENT', post_save_comment);

export const save_comment =
	createReducerAsync(post_save_comment_action);

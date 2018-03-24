import { createActionAsync, createReducerAsync } from 'redux-act-async';

const get_user = params => {
	return new Promise((resolve, reject) => {
		const { net_id } = params;
		const options = {
			method: 'GET'
		};

		fetch(`${window.server}/user/${net_id}`, options)
			.then(response => response.json())
			.then(
				responseJson => {
					resolve(responseJson);
				},
				error => {
					console.log(`ERROR - GET /user/${net_id}`); // TODO implement error handling
					console.warn(error);
					reject(error);
				}
			);
	});
};

export const get_user_action =
	createActionAsync('GET_USER', get_user);

export const user =
	createReducerAsync(get_user_action);

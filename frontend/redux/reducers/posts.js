import { createActionAsync, createReducerAsync } from 'redux-act-async';

const get_topic_posts = () => {
	return new Promise((resolve, reject) => {
		resolve([
			{
				_id: 1,
				content: 'Post Content',
				rank: 1,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				],
			},
			{
				_id: 2,
				content: 'Post Content',
				rank: 2,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				]
			},
			{
				_id: 3,
				content: 'Post Content',
				rank: 3,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				]
			},
			{
				_id: 4,
				content: 'Post Content',
				rank: 4,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				]
			},
			{
				_id: 5,
				content: 'Post Content',
				rank: 5,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				]
			}
		])
	});
};

export const get_topic_posts_action =
	createActionAsync('GET_TOPIC_POSTS', get_topic_posts);

export const topic_posts =
	createReducerAsync(get_topic_posts_action);

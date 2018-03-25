import { combineReducers } from 'redux';

import {
	create_comment
} from './comment';

import {
	topic_posts
} from './post';

import {
	topic,
	topics
} from './topic';

import {
	topic_votables,
	votables
} from './votable';

import {
	voter_history,
	save_vote,
	map_data
} from './vote';

const reducers = combineReducers({
	create_comment,
	topic_posts,
	topic,
	topics,
	topic_votables,
	votables,
	voter_history,
	save_vote,
	map_data
});

export default reducers;
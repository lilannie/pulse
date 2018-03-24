import { combineReducers } from 'redux';

import {
	save_comment
} from './comment';

import {
	topic_posts
} from './post';

import {
	topic,
	topics
} from './topic';

import {
	topic_votables
} from './votable';

import {
	voter_history,
	save_vote
} from './vote';

const reducers = combineReducers({
	save_comment,
	topic_posts,
	topic,
	topics,
	topic_votables,
	voter_history,
	save_vote
});

export default reducers;
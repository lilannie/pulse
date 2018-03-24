import { combineReducers } from 'redux';

import {
	topics
} from './topic';

import {
	topic_votables
} from './votable';

import {
	topic_posts
} from './post';

import {
	voter_history,
	save_vote
} from './vote';

const reducers = combineReducers({
	topics,
	topic_votables,
	topic_posts,
	voter_history
});

export default reducers;
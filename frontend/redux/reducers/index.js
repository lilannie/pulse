import { combineReducers } from 'redux';

import {
	topics
} from './topic';

import {
	topic_votables
} from './votable';

import {
	topic_posts
} from './posts';

const reducers = combineReducers({
	topics,
	topic_votables,
	topic_posts
});

export default reducers;
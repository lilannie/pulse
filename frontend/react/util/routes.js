import ViewTopics from '../views/ViewTopics';
import ViewTopic from '../views/ViewTopic';
import CreatePost from '../views/CreatePost';
import CreateVotable from '../views/CreateVotable';
import Dashboard from '../views/Dashboard';

export const getRoutes = is_citizen => {
	if (is_citizen) {
		return [
			{ path: '/topics', name: 'Topics', icon: 'pe-7s-network', component: ViewTopics, key: 'Topics'},
			{ path: '/topic/:id/view', name: 'Topic', icon: 'pe-7s-network', component: ViewTopic, key: 'Topic', exact: true },
			{ path: '/post/create', name: 'Create Post', icon: 'pe-7s-plus', component: CreatePost, key: 'CreatePost' },
			{ path: '/votable/create', name: 'Create Poll', icon: 'pe-7s-plus', component: CreateVotable, key: 'CreateVotable' }
		];
	}

	return [
		{ path: '/dashboard', name: 'Dashboard', icon: 'pe-7s-graph', component: Dashboard, key: 'Dashboard'},
		{ path: '/post/create', name: 'Create Post', icon: 'pe-7s-plus', component: CreatePost, key: 'CreatePost' },
		{ path: '/votable/create', name: 'Create Poll', icon: 'pe-7s-plus', component: CreateVotable, key: 'CreateVotable' }
		];
};

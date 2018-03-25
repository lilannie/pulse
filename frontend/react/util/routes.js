import ViewTopics from '../views/ViewTopics';
import ViewTopic from '../views/ViewTopic';
import CreatePost from '../views/CreatePost';
import CreateVotable from '../views/CreateVotable';

const appRoutes = [
  { path: '/topics', name: 'Topics', icon: 'pe-7s-network', component: ViewTopics, key: 'Topics'},
	{ path: '/topic/:id/view', exact: true,  name: 'Topic', icon: 'pe-7s-network', component: ViewTopic, key: 'Topic' },
	{ path: '/post/create', name: 'Create Post', icon: 'pe-7s-plus', component: CreatePost, key: 'CreatePost' },
	{ path: '/votable/create', name: 'Create Poll', icon: 'pe-7s-plus', component: CreateVotable, key: 'CreateVotable' },
	{ redirect: true, path:'/', to:'/topics', name: 'Topics' }
];

export default appRoutes;

import ViewTopics from '../views/ViewTopics';
import ViewTopic from '../views/ViewTopic';

const appRoutes = [
  { path: '/topics', name: 'Topics', icon: 'pe-7s-network', component: ViewTopics },
	{ path: '/topic/:id/view', exact: true,  name: 'Topic', icon: 'pe-7s-network', component: ViewTopic },
	{ redirect: true, path:'/', to:'/topics', name: 'Topics' }
];

export default appRoutes;

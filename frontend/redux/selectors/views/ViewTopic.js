import { get_topic_posts_action } from '../../reducers/posts';
import { get_topic_votables_action } from '../../reducers/votable';

export const mapStateToProps = state => {
	return {
		posts: state.topic_posts.data || [],
		votables: state.topic_votables.data || [],
		loading: state.topic_posts.loading || state.topic_votables.loading
	};
};

export const mapDispatchToProps = dispatch => {
	return {
		dispatchGetPosts: () => {
			dispatch(get_topic_posts_action());
		},
		dispatchGetVotables: () => {
			dispatch(get_topic_votables_action());
		}
	};
};

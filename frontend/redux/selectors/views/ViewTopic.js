import { post_create_comment_action } from '../../reducers/comment';
import { get_topic_posts_action } from '../../reducers/post';
import { get_topic_votables_action } from '../../reducers/votable';
import { get_voter_history_action, post_save_vote_action } from '../../reducers/vote';
import { get_topic_action } from '../../reducers/topic';

export const mapStateToProps = state => {
	return {
		topic: state.topic.data || {},
		posts: state.topic_posts.data || [],
		votables: state.topic_votables.data || [],
		history: state.voter_history.data || {},
		loading: state.topic_posts.loading || state.topic_votables.loading
							|| state.voter_history.loading || state.topic.loading
							|| state.save_vote.loading || state.create_comment.loading
	};
};

export const mapDispatchToProps = dispatch => {
	return {
		dispatchGetTopic: params => {
			dispatch(get_topic_action(params));
		},
		dispatchGetPosts: params => {
			dispatch(get_topic_posts_action(params));
		},
		dispatchGetVotables: params => {
			dispatch(get_topic_votables_action(params));
		},
		dispatchGetVoterHistory: params => {
			dispatch(get_voter_history_action(params));
		},
		dispatchSaveVote: (params, callback) => {
			dispatch(post_save_vote_action(params, callback));
		},
		dispatchCreateComment: (params, callback) => {
			dispatch(post_create_comment_action(params, callback));
		}
	};
};

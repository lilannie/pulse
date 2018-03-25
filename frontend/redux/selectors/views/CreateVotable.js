import { create_votable } from '../../reducers/votable';
import { get_topics_action } from '../../reducers/topic';

export const mapStateToProps = state => {
	return {
		topics: state.topics.data || [],
		loading: state.topics.loading
	};
};

export const mapDispatchToProps = dispatch => {
	return {
		dispatchGetTopics: () => {
			dispatch(get_topics_action());
		},
		dispatchCreateVotable: params => {
			dispatch(create_votable(params));
		}
	};
};

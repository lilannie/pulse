import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row } from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../../redux/selectors/views/ViewTopic';

import Votable from '../components/Votable';
import Post from '../components/Post';
import Spinner from '../Spinner';

class ViewTopic extends Component {
	constructor(props) {
		super(props);

		this.renderTopicItems = this.renderTopicItems.bind(this);
		this.handleVoteChange = this.handleVoteChange.bind(this);
		this.handleSaveComment = this.handleSaveComment.bind(this);
	}

	componentDidMount() {
		const {
			dispatchGetTopic,
			dispatchGetPosts,
			dispatchGetVotables,
			dispatchGetVoterHistory,
			match
		} = this.props;

		const topicParam = {
			topic_id: match.params.id
		};

		dispatchGetTopic(topicParam);

		dispatchGetPosts(topicParam);

		dispatchGetVotables(topicParam);

		dispatchGetVoterHistory({
			user_blockchain_id: this.context.user.id
		});
	}

	handleVoteChange(vote) {
		const {
			dispatchSaveVote,
			dispatchGetVoterHistory,
		} = this.props;

		dispatchSaveVote(
			Object.assign({
				user_blockchain_id: this.context.user.id
			}, vote),
			dispatchGetVoterHistory.bind(null, {
				user_blockchain_id: this.context.user.id
			})
		);
	}

	handleSaveComment(comment) {
		const {
			dispatchSaveComment,
			dispatchGetPosts,
		} = this.props;

		dispatchSaveComment(
			Object.assign({
				_creator_id: this.context.user.id
			}, comment),
			dispatchGetPosts.bind(null, {
				topic_id: match.params.id
			})
		);
	}

	renderTopicItems() {
		const {
			votables,
			posts,
			history
		} = this.props;

		// Sort items in descending order by rank
		return votables.concat(posts)
			.sort((item1, item2) => {
				return item2.rank - item1.rank;
			})
			.map((item, key) => {
				if (item.choices !== undefined) {
					return (<Votable key={ key }
					                 userChoice={ history[item._contract_id] }
					                 handleChange={ this.handleVoteChange }
					                 { ...item } />);
				}
				return (<Post key={ key }
				              handleSaveComment={ this.handleSaveComment }
				              { ...item }/>);
			});
	}

	render() {
		if (this.props.loading) {
			return (<Spinner/>);
		}

		return (
			<div className="content">
				<h2>{ this.props.topic.title }</h2>
				<Grid fluid>
					<Row>
						{ this.renderTopicItems() }
					</Row>
				</Grid>
			</div>
		);
	}
}

ViewTopic.PropTypes = {
	topic: PropTypes.object.isRequired,
	posts: PropTypes.array.isRequired,
	votables: PropTypes.array.isRequired,
	history: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	dispatchGetTopic: PropTypes.func.isRequired,
	dispatchGetPosts: PropTypes.func.isRequired,
	dispatchGetVotables: PropTypes.func.isRequired,
	dispatchGetVoterHistory: PropTypes.func.isRequired,
	dispatchSaveVote: PropTypes.func.isRequired,
	dispatchSaveComment: PropTypes.func.isRequired
};

ViewTopic.contextTypes = {
	user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTopic);

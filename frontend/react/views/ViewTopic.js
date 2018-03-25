import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
	Grid,
	Row
} from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../../redux/selectors/views/ViewTopic';

import Votable from '../components/Votable';
import Post from '../components/Post';
import Spinner from '../Spinner';
import PageToolbar from '../components/Common/PageToolbar';

class ViewTopic extends Component {
	constructor(props) {
		super(props);

		this._topicParam = {
			topic_id: match.params.id
		};

		this._userParam = {
			user_blockchain_id: this.context.user.id
		};

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

		} = this.props;

		dispatchGetTopic(this._topicParam);

		dispatchGetPosts(this._topicParam);

		dispatchGetVotables(this._topicParam);

		dispatchGetVoterHistory(this._userParam);
	}

	handleVoteChange(vote) {
		const {
			dispatchSaveVote,
			dispatchGetVoterHistory,
		} = this.props;

		dispatchSaveVote(
			Object.assign(vote, this._userParam),
			dispatchGetVoterHistory.bind(null, this._userParam)
		);
	}

	handleSaveComment(comment) {
		const {
			dispatchCreateComment,
			dispatchGetPosts,
			match
		} = this.props;

		dispatchCreateComment(
			Object.assign({
				_creator_id: this.context.user.id
			}, comment),
			dispatchGetPosts.bind(null, this._topicParam)
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

		const {
			topic
		} = this.props;

		return (
			<div className="content">
				<PageToolbar title={
					<Link to={`/topic/${topic.id}/view`} style={{ color: 'black' }}>{ this.props.topic.title }</Link>
				} />

				<br/>
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
	dispatchCreateComment: PropTypes.func.isRequired
};

ViewTopic.contextTypes = {
	user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTopic);

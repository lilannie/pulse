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
	}

	componentDidMount() {
		this.props.dispatchGetPosts();
		this.props.dispatchGetVotables();
	}

	renderTopicItems() {
		const {
			votables,
			posts
		} = this.props;

		// Sort items in descending order by rank
		return votables.concat(posts)
			.sort((item1, item2) => {
				return item2.rank - item1.rank;
			})
			.map((item, key) => {
				if (item.choices !== undefined) {
					return (<Votable key={ key } { ...item }/>);
				}
				return (<Post key={ key } { ...item }/>);
			});
	}

	render() {
		if (this.props.loading) {
			return (<Spinner/>);
		}

		return (
			<div className="content">
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
	votables: PropTypes.array.isRequired,
	posts: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	dispatchGetPosts: PropTypes.func.isRequired,
	dispatchGetVotables: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTopic);

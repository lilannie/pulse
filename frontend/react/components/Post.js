import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'react-bootstrap';

import { Card } from './Card.js';
import { tableBorder } from '../util/style';

class Post extends Component {
	constructor(props) {
		super(props);

		this.renderComments = this.renderComments.bind(this);
	}

	renderComments() {
		return this.props.comments
			.sort((item1, item2) => {
				return item2.rank - item1.rank;
			})
			.map((comment, key) => {
			return (
				<tr key={key}>
					<td>
						{ comment.content }
					</td>
				</tr>
			);
		});
	}

	render() {
		const {
			description
		} = this.props;

		return (
			<Col md={4}>
				<Card
					title={ this.props.content }
					stats={
						<Button bsStyle="info" block>Add Comment</Button>
					}
					content={
						<div className="votable">
							<div className="description">
								{ description }
							</div>
							<div className="table-full-width">
								<table className="table" style={ tableBorder }>
									<tbody>
									{ this.renderComments() }
									</tbody>
								</table>
							</div>
						</div>
					}
				/>
			</Col>
		);
	}
}

Post.PropTypes = {
	_id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	rank: PropTypes.number.isRequired,
	date_created: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired,
	comments: PropTypes.shape({
		_id: PropTypes.number.isRequired,
		content: PropTypes.string.isRequired,
		rank: PropTypes.number.isRequired,
		date_created: PropTypes.string.isRequired,
	})
};

export default Post;

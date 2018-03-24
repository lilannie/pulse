import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { Card } from './Card.js';

class Post extends Component {
	constructor(props) {
		super(props);

		this.renderComments = this.renderComments.bind(this);
	}

	renderComments() {
		return this.props.comments.map((comments, key) => {
			return (
				<tr key={key}>
					<td>

					</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<Col md={4}>
				<Card
					title={ this.props.content }
					category="Backend development"
					stats="Updated 3 minutes ago"
					statsIcon="fa fa-history"
					content={
						<div className="votable">
							<div className="description">
								{ description }
							</div>
							<div className="table-full-width">
								<table className="table">
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

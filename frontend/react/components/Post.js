import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { Card } from './Card.js';
import { Tasks } from './Tasks/Tasks.js';

class Post extends Component {

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
									{ this.renderChoices() }
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

export default Post;

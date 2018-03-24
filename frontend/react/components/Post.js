import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import { Card } from './Card.js';
import { Tasks } from './Tasks/Tasks.js';

class Post extends Component {

	render() {
		return (
			<Col md={4}>
				<Card
					title="Tasks"
					category="Backend development"
					stats="Updated 3 minutes ago"
					statsIcon="fa fa-history"
					content={
						<div className="table-full-width">
							<table className="table">
								<Tasks />
							</table>
						</div>
					}
				/>
			</Col>
		);
	}
}

export default Post;

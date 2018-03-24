import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import { Card } from './Card.js';

class Votable extends Component {

	render() {
		return (
			<Col md={4}>
				<Card
					statsIcon="fa fa-history"
					title="Email Statistics"
					category="Last Campaign Performance"
					stats="Updated 3 minutes ago"
					content={
						<div className="votable">

						</div>
					}
				/>
			</Col>
		);
	}
}

export default Votable;

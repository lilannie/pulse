import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { Card } from './Card.js';

import { textCentered } from '../util/style';

class TopicCard extends Component {
	render() {
		return (
			<Col lg={3} sm={6}>
				<Card
					title={
						<div className="topic" style={ textCentered }>
							{ this.props.title }
						</div>
					}
				/>
			</Col>
		);
	}
}

TopicCard.PropTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

export default TopicCard;

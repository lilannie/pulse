import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { Card } from './Card.js';
import { RadioButton } from '../elements/CustomRadio/CustomRadio';

class Votable extends Component {
	constructor(props) {
		super(props);

		this.renderChoices = this.renderChoices.bind(this);
	}

	renderChoices() {
		return this.props.choices.map((choice, key) => {
			return (
				<tr key={key}>
					<td>
						<RadioButton
							number={ key }
							option={ choice }
							name={ this._contract_id }
						/>
					</td>
					<td>{ choice }</td>
				</tr>
			);
		});
	}

	render() {
		const {
			title,
			description
		} = this.props;

		return (
			<Col md={4}>
				<Card
					statsIcon="fa fa-history"
					title={ title }
					stats="Updated 3 minutes ago"
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

Votable.PropTypes = {
	title: PropTypes.string.isRequired,

};
export default Votable;

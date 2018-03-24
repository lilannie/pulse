import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { Card } from './Card.js';
import CustomRadio  from '../elements/CustomRadio/CustomRadio';

class Votable extends Component {
	constructor(props) {
		super(props);

		this.renderChoices = this.renderChoices.bind(this);
	}

	renderChoices() {
		const {
			choices,
			userChoice,
			_contract_id,
			handleChange
		} = this.props;

		return choices.map((choice, key) => {
			return (
				<tr key={key}>
					<td>
						<CustomRadio
							number={ `${key}-${_contract_id}` }
							option={ choice }
							name={ _contract_id }
							onChange={ handleChange.bind(null, {
								votable_contract_id: _contract_id,
								choice
							}) }
							checked={  userChoice && userChoice === choice }
							label={ choice }
						/>
					</td>
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
					stats="Saved 3 minutes ago"
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
	_contract_id: PropTypes.number.isRequired,
	creator: PropTypes.shape({
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired
	}),
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	choices: PropTypes.array.isRequired,
	rank: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
	userChoice: PropTypes.string
};

export default Votable;

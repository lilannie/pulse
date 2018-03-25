import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import USAMap from "react-usa-map";

import Card from '../components/Card';

class FilterableChart extends Component {
	constructor(props) {
		super(props);

		this.handleSelectChange = this.handleSelectChange.bind(this);

		this.state = {
			value: []
		};
	}

	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	}

	mapHandler(event) {
		alert(event.target.dataset.name);
	}

	render() {
		const {
			filters,
			title,
			category
		} = this.props;

		return (
			<Card
				statsIcon="fa fa-history"
				id="Filterable"
				title={ title }
				category={ category }
				stats="Updated 3 minutes ago"
				content={
					<div className="filterable-chart">
						<Select
							multi
							onChange={ this.handleSelectChange }
							options={ filters }
							placeholder="Select filters:"
							removeSelected={ true }
							simpleValue
							value={ this.state.value }
						/>

						<USAMap onClick={this.mapHandler} />
					</div>
				}
			/>
		);
	}
}

FilterableChart.PropTypes = {
	filters: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired
};

export default FilterableChart;
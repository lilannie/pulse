import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
	Grid,
	Row,
	Col
} from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../../redux/selectors/views/Dashboard';

import FilterableMap from '../components/FilterableMap';
import Spinner from '../Spinner';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			contract_id: ''
		};

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.renderSelectOptions = this.renderSelectOptions.bind(this);
	}

	handleSelectChange(event) {
		this.props.dispatchGetMapData(contract_id);
		this.setState({
			contract_id: event.target.value
		});
	}

	renderSelectOptions() {
		return this.props.votables.map((votable, key) => {
			return <option
				key={ key }
				value={votable.contract_id}>
				{ votable.title }
				</option>;
		});
	}

	render() {
		if (this.props.loading) return (<Spinner />);

		return (
			<div className="content">
				<Grid fluid>
					<Row>
						<Col lg={12}>
							Please select a poll question to visualize:
							<input type="select">
								{ this.renderSelectOptions }
							</input>
						</Col>
					</Row>
					<Row>
						<Col lg={12} sm={6}>
							<FilterableMap
								title="Example"
								description="Example"
								filters={[
									{ value: 'one', label: 'One' },
									{ value: 'two', label: 'Two', clearableValue: false }
								]}
								data={ this.props.data }
							/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

Dashboard.PropTypes = {
	loading: PropTypes.bool.isRequired,
	data: PropTypes.array.isRequired,
	dispatchGetMapData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	Grid,
	Row,
	Col
} from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../../redux/selectors/views/ViewTopic';

import FilterableChart from '../components/FilterableChart';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="content">
				<Grid fluid>
					<Row>
						<Col lg={12} sm={6}>
							<FilterableChart
								title="Example"
								description="Example"
								filters={[
									{ value: 'one', label: 'One' },
									{ value: 'two', label: 'Two', clearableValue: false }
								]}
							/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

Dashboard.PropTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

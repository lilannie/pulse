import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
	Grid,
	Row,
	FormControl
} from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../../redux/selectors/views/ViewTopic';

import PageToolbar from '../components/Common/PageToolbar';

class CreatePost extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="content">
				<PageToolbar title={
					<Link to={`/post/create`} style={{ color: 'black' }}>{ this.props.topic.title }</Link>
				} />

				<br/>

				<Grid fluid>
					<Row>
					<form onSubmit={this.handleSubmit}>
						<label>
							Name:
							<input type="text" value={this.state.value} onChange={this.handleChange} />
						</label>
						<input type="submit" value="Submit" />
					</form>
					</Row>
				</Grid>
			</div>
		);
	}
}

CreatePost.PropTypes = {

};

CreatePost.contextTypes = {
	user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Navigation extends Component {
	render() {
		if (this.context.user.is_admin) {
			return (
				<div className="navigation">
					<ul>
						<li className="btn-main"><Link to={ '/' }>Home</Link></li>
					</ul>
				</div>
			);
		}

		return (
			<div className="navigation">
				<div className="navigation">
					<ul>
						<li className="btn-main"><Link to={ '/' }>Home</Link></li>
					</ul>
				</div>
			</div>
		);
  }
}

export default withRouter(connect(() => ({}), () => ({}))(Navigation));

Navigation.contextTypes = {
	user: PropTypes.object
};

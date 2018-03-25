import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
	Grid,
	Row,
	Nav,
	Navbar,
	NavItem
} from 'react-bootstrap';

class PageToolbar extends Component {
	render() {
		return (
			<Grid fluid>
				<Row>
					<Navbar collapseOnSelect style={{ backgroundColor: '#a2e8f6' }}>
						<Navbar.Header>
							<Navbar.Brand>
								{ this.props.title }
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight style={{ marginRight: 0 }}>
								<NavItem>
									<Link to={'/post/create'} style={{ color: 'black' }}>
										Create Post
									</Link>
								</NavItem>
								<NavItem>
									<Link to={'/votable/create'} style={{ color: 'black' }}>
										Create Poll
									</Link>
								</NavItem>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</Row>
			</Grid>
		);
	}
}

PageToolbar.PropTypes = {
	title: PropTypes.object.isRequired
};

export default PageToolbar;

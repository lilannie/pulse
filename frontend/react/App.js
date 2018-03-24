import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/index.scss';
import { mapStateToProps } from '../redux/selectors/App';

import Header from './Header';
import Navigation from './Navigation';
import NotFound from './NotFound';

const allowAdminOnly = Component => {
	return (props) => (
		window.appData.user.is_admin
			? <Redirect to={{
						pathname: '/',
						state: { from: props.location }
					}}
				/>
			: <Component {...props} />
	);
};

class App extends Component {
	constructor(props) {
		super(props);
	}

	getChildContext() {
		return Object.assign({}, window.appData);
	}

  render() {
    return (
    	<div className='app container-fluid'>
		    <Header />
		    <Navigation/>
		    <Switch>
			    <Route exact path='/' render={ props => (<div></div>) }/>
			    <Route exact path='/404' component={ NotFound } />
		    </Switch>
	    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));

App.childContextTypes = {
	user: PropTypes.object,
};

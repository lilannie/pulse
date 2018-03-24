import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Switch, Route } from 'react-router-dom';

import reducers from './redux/reducers';
import App from './react/App';
import Login from './react/views/Login';

const store = createStore(reducers, applyMiddleware(logger), applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={ store }>
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={ Login } />
				<Route path="/logout" render={ () => {
					window.location.reload();
				}} />
				<Route path="/" component={ App } />
			</Switch>
		</BrowserRouter>
	</Provider>,
document.getElementById('app'));
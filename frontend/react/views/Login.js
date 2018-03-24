import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<form className="login" action="/login" method="post" >
				User Type
				<br/>
				<input id="user_type" type="text" name="user_type"/>
				<br/>
				<button type="submit">Sign In</button>
			</form>
		);
	}
}
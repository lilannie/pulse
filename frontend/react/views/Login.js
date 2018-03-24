import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<form className="login" action="/login" method="post" >
				Citizen Blockchain Id or Representative ID
				<br/>
				<input id="id" type="text" name="id"/>
				<br/>
				Are you a citizen?
				<input id="is_citizen" type="checkbox" name="user_type"/>
				<br/>
				<button type="submit">Sign In</button>
			</form>
		);
	}
}
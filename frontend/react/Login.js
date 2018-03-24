import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="login">
				<h2>Sign In</h2>
				<form action="/login" method="post" >
					<label htmlFor="university_id">University ID  </label>
					<input id="university_id" type="text" name="university_id"/>
					<br/>
					<button className="form-buttons" type="submit">Sign In</button>
				</form>
			</div>
		);
	}
}
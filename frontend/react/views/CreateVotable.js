import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
	Grid,
	Row,
	Col,
	Button,
	FormGroup,
	ControlLabel,
	FormControl
} from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../../redux/selectors/views/CreateVotable';

import Spinner from '../Spinner';
import Card from '../components/Card';
import PageToolbar from '../components/Common/PageToolbar';

class CreateVotable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: '',
			choices: [
				''
			]
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderChoices = this.renderChoices.bind(this);
	}

	componentDidMount() {
		this.props.dispatchGetTopics();
	}

	handleChange(event, property) {
		console.log(event.target);
		this.setState({
			[property]: event.target.value
		});
	}

	handleSubmit() {
		const {
			history,
			dispatchCreateVotable
		} = this.props;

		dispatchCreateVotable(Object.assign({}, this.state));
		// TODO
		history.push('/');
	}

	renderChoices() {
		return this.state.choices.map((choice, key) => {
			return (
				<FormControl
					label={ `Option #${ (key+1) }` }
					componentClass="text"
					bsClass="form-control"
					value={ choice }
					name={ `option-${key}` }
					onChange={ e => this.handleChange(e, 'choice', key) }
				/>
			);
		});
	}

	// TODO implement topic select
	renderTopicSelect() {

	}

	render() {
		if (this.props.loading) return (<Spinner />);

		return (
			<div className="content">
				<PageToolbar title={
					<Link to={`/votable/create`} style={{ color: 'black' }}>Create Poll</Link>
				} />

				<br/>

				<Grid fluid>
					<Col md={ 12 }>
						<Card
							content={
								<form>
									<Row>
										<Col md={12}>
											<FormGroup controlId="formBasicText">
												<ControlLabel>Title</ControlLabel>
												<FormControl
													rows="5"
													name="title"
													componentClass="text"
													bsClass="form-control"
													onChange={ e => this.handleChange(e, 'title') }
													value={ this.state.title }
												/>
											</FormGroup>
										</Col>
									</Row>

									<Row>
										<Col md={12}>
											<FormGroup controlId="formControlsTextarea">
												<ControlLabel>Description</ControlLabel>
												<FormControl
													rows="5"
													name="description"
													componentClass="textarea"
													bsClass="form-control"
													placeholder="Provide a description. Ask a question. Provide background information."
													onChange={ e => this.handleChange(e, 'description') }
													value={ this.state.description }
												/>
											</FormGroup>
										</Col>
									</Row>

									<Row>
										<Col md={12}>
											<FormGroup controlId="formBasicText">
												<ControlLabel>Options</ControlLabel>
												{ this.renderChoices() }
											</FormGroup>
										</Col>
									</Row>

									<Button
										bsStyle="info"
										pullRight
										fill
										type="submit"
									>
										Save
									</Button>

									<div className="clearfix"></div>
								</form>
							}
						/>
					</Col>
				</Grid>
			</div>
		);
	}
}

CreateVotable.PropTypes = {
	topics: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	dispatchGetTopics: PropTypes.func.isRequired,
	dispatchCreateVotable: PropTypes.func.isRequired
};

CreateVotable.contextTypes = {
	user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateVotable);

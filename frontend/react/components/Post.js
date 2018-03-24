import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Col,
	Button,
	Row,
	FormGroup,
	ControlLabel,
	FormControl
} from 'react-bootstrap';

import { Card } from './Card.js';
import { tableBorder } from '../util/style';

class Post extends Component {
	constructor(props) {
		super(props);

		this.state = {
			comment_open: false
		};

		this.renderComments = this.renderComments.bind(this);
		this.toggleCommentForm = this.toggleCommentForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.saveComment = this.saveComment.bind(this);
	}

	toggleCommentForm(comment_open) {
		this.setState({
			comment_open,
			comment: ''
		});
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		});
	}

	saveComment() {
		this.toggleCommentForm(false);
		this.props.handleSaveComment({ content: this.state.value });
	}

	renderComments() {
		return this.props.comments
			.sort((item1, item2) => {
				return item2.rank - item1.rank;
			})
			.map((comment, key) => {
			return (
				<tr key={key}>
					<td>
						{ comment.content }
					</td>
				</tr>
			);
		});
	}

	render() {
		const {
			description,
			content
		} = this.props;

		let footer = (
			<Button bsStyle="info"
			        pullRight
              block
              onClick={ this.toggleCommentForm.bind(null, true) }>
									Add Comment
			</Button>
		);

		if (this.state.comment_open) {
			footer = (
				<Row className="comment-form">
					<Col md={12}>
						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>New Comment</ControlLabel>
							<FormControl rows="2"
							             name="comment"
							             componentClass="textarea"
							             bsClass="form-control"
							             onChange={ this.handleChange }
							             placeholder="What do you think about this idea?"/>
							<br/>
							<Button bsStyle="info"
							        pullRight
							        fill
							        type="submit"
							        onSubmit={ this.saveComment }>
								Save
							</Button>
						</FormGroup>
					</Col>
				</Row>
			);
		}

		return (
			<Col md={4}>
				<Card
					title={ content }
					content={
						<div className="votable">
							<div className="description">
								{ description }
							</div>
							<div className="table-full-width">
								<table className="table" style={ tableBorder }>
									<tbody>
									{ this.renderComments() }
									</tbody>
								</table>
							</div>
							{ footer }
						</div>
					}
				/>
			</Col>
		);
	}
}

Post.PropTypes = {
	_id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	rank: PropTypes.number.isRequired,
	date_created: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired,
	comments: PropTypes.shape({
		_id: PropTypes.number.isRequired,
		content: PropTypes.string.isRequired,
		rank: PropTypes.number.isRequired,
		date_created: PropTypes.string.isRequired,
	}),
	handleSaveComment: PropTypes.func.isRequired
};

export default Post;

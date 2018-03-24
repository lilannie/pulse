import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../../redux/selectors/views/ViewTopics';

import Topic from '../components/TopicCard';
import Spinner from '../Spinner';

class ViewTopics extends Component {
	componentDidMount() {
		this.props.dispatchGetTopics();
	}

	render() {
		if (this.props.loading) {
			return <Spinner/>
		}
    return (
      <div className="content">
        <Grid fluid>
	        <Row>
		        {
		        	this.props.topics.map((topic, key) => {
		        		return (
		        			<Link to={`/topic/${topic._id}/view`}>
		        			  <Topic key={key} { ...topic } />
					        </Link>
				        );
			        })
		        }
	        </Row>
        </Grid>
      </div>
    );
  }
}

ViewTopics.PropTypes = {
	topics: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	dispatchGetTopics: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTopics);

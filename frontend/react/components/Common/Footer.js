import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (
      <footer className="footer">
        <Grid>
          <nav className="copyright pull-left">
            HackISU Spring 2018
          </nav>
          <p className="copyright pull-right">
            <a href="https://github.com/lilannie/pulse">Github</a>
          </p>
        </Grid>
      </footer>
		);
	}
}

export default Footer;

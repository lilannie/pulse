import React, {Component} from 'react';
import { NavItem, Nav } from 'react-bootstrap';

class HeaderLinks extends Component{
  render(){
    return (
    	<div>
	      <Nav pullRight>
	        <NavItem eventKey={3} href="/logout">Log out</NavItem>
	      </Nav>
	    </div>
    );
  }
}

export default HeaderLinks;

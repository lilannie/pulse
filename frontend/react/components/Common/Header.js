import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import HeaderLinks from './HeaderLinks.js';

import appRoutes from '../../util/routes.js';

class Header extends Component{
    constructor(props){
        super(props);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
        this.state = {
            sidebarExists: false
        };
    }

    mobileSidebarToggle(e){
        if(this.state.sidebarExists === false){
            this.setState({
                sidebarExists : true
            });

        }
        e.preventDefault();
        document.documentElement.classList.toggle('nav-open');
        var node = document.createElement('div');
        node.id = 'bodyClick';
        node.onclick = function(){
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle('nav-open');
        };
        document.body.appendChild(node);
    }

    getBrand(){
	    if (this.props.location.pathname === '/topics') return 'Topics';

	    if(new RegExp('(/topic/)\\d+(/view)').test(this.props.location.pathname)) return 'Topic Votables and Posts';
    }

    render(){
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        { this.getBrand() }
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={ this.mobileSidebarToggle }/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <HeaderLinks />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;

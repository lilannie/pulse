import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import PropTypes from 'prop-types';

import '../scss/light-bootstrap-dashboard.scss';
import '../scss/index.scss';

import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Sidebar from './components/Common/Sidebar';

import { style } from './util/variables.js';

import appRoutes from './util/routes.js';

class App extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.state = {
            _notificationSystem: null
        };
    }

		getChildContext() {
			return Object.assign({}, window.appData);
		}

    handleNotificationClick(position){
    	  console.log('handleNotificationClick');

        this.state._notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.
                </div>
            ),
            level: 'success',
            position: position,
            autoDismiss: 15,
        });
    }

    componentDidMount(){
        this.setState({_notificationSystem: this.refs.notificationSystem});
    }

    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }

    render() {
        return (
          <div className="wrapper">
            <NotificationSystem ref="notificationSystem" style={style}/>
            <Sidebar {...this.props} />
            <div id="main-panel" className="main-panel">
              <Header {...this.props}/>
                <Switch>
                  {
                    appRoutes.map((prop,key) => {
                      if(prop.redirect) {
	                      return (
		                      <Redirect from={prop.path} to={prop.to} key={key}/>
	                      );
                      }

                      return (
                        <Route path={prop.path} exact={prop.exact} component={prop.component} key={key}/>
                      );
                    })
                  }
                </Switch>
              <Footer />
            </div>
          </div>
        );
    }
}

App.childContextTypes = {
	user: PropTypes.object,
};

export default App;

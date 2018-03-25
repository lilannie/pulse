import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import HeaderLinks from './HeaderLinks.js';

import { getRoutes } from '../../util/routes.js';
import { paddingBottom, paddingTop } from '../../util/style';

class Sidebar extends Component{
    constructor(props){
      super(props);
      this.state = {
        width: window.innerWidth
      };

	    this._routes = getRoutes(window.appData.user.is_citizen);

      this.activeRoute = this.activeRoute.bind(this);
    }

    activeRoute(routeName) {
      return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }

    updateDimensions(){
      this.setState({width:window.innerWidth});
    }
    componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    render(){
      const sidebarBackground = {
        backgroundImage: 'url( /img/sidebar-5.jpg )'
      };
      return (
        <div id="sidebar" className="sidebar" data-color="black" data-image={ '/img/sidebar-5.jpg' }>
          <div className="sidebar-background" style={ sidebarBackground }></div>
          <div className="logo" style={ paddingBottom(20) }>
            <a href="/" className="simple-text logo-mini">
              <div className="logo-img">
                <img src={ '/img/capitol.png' } alt="logo_image"/>
              </div>

            </a>
            <a href="/" className="simple-text logo-normal" style={ paddingTop(20) }>
              Pulse
            </a>
          </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            { this.state.width <= 991 ? (<HeaderLinks />):null }
            {
	            this._routes.map((prop,key) => {
                if (!prop.redirect && prop.name !== 'Topic')
                  return (
                    <li className={ prop.upgrade ? "active active-pro":this.activeRoute(prop.path) } key={ key }>
                      <NavLink to={ prop.path } className="nav-link" activeClassName="active">
                        <i className={ prop.icon }></i>
                        <p>{ prop.name }</p>
                      </NavLink>
                    </li>
                  );
                return null;
              })
            }
          </ul>
          </div>
        </div>
      );
    }
}

export default Sidebar;

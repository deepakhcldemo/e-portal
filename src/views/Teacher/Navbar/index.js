import React, { Component } from "react";
import {withRouter, NavLink} from 'react-router-dom';
import './navbar.scss';

const links = [{
  id:1,
  name: 'Dashboard',
  link: '/teacher'
},
{
  id:1,
  name: 'Video',
  link: '/teacher/videos'
},
{
  id:1,
  name: 'Notifications',
  link: '/teacher/notifications'
}
]

class Navbar extends Component {
  render = () => {
    return (
      <div className="row flex-xl-nowrap">
        <div className="col-12 col-md-12 col-xl-12 padding-zero">
          <nav className="box-shadow">
            <NavLink exact to="/teacher" activeClassName="" className="home-header-nav-item home-header-logo logo hide" />
            <ul>            
              {links && links.map((link,index) => {
                  return (
                      <li key={index} className={this.props.location.pathname === link.link ? 'active' : ''}>
                            <NavLink className="nav-link" activeClassName="" exact to={link.link}>{link.name}</NavLink>
                      </li>
                    )
                })}              
              </ul>
          </nav>
        </div>
      </div>
    );
  };
}
export default withRouter(Navbar)

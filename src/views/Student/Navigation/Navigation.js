import React, { Component } from "react";
import {withRouter, NavLink} from 'react-router-dom';

const links = [{
  id:1,
  name: 'Home',
  link: '/student'
},
{
  id:1,
  name: 'Teacher',
  link: '/student/teacher'
},
{
  id:1,
  name: 'Notifications',
  link: '/student/notifications'
}
]

class Navbar extends Component {
  render = () => {
    return (
      <nav className="navbar navbar-expand-lg box-shadow">
        <a className="navbar-brand hide" href="/">Logo</a>                  
          <ul className="navbar-nav">            
            {links && links.map((link,index) => {
                return (
                    <li key={index} className={this.props.location.pathname === link.link ? 'nav-item active' : 'nav-item'}>
                        <NavLink className="nav-link" activeClassName="" exact to={link.link}>{link.name}</NavLink>
                    </li>
                )
            })}              
          </ul>
      </nav>
    );
  };
}
export default withRouter(Navbar)

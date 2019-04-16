import React, { Component } from "react";
import {withRouter, NavLink} from 'react-router-dom';
import './styles.scss';

const links = [{
  id:1,
  name: 'Home',
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
      <nav className="navbar navbar-expand-lg box-shadow">
        <a className="navbar-brand hide" href="/">Logo</a>                  
          <ul className="navbar-nav">            
            {links && links.map((link,index) => {
                return (
                    <li key={index} className={this.props.location.pathname === link.link ? 'nav-item active' : 'nav-item'}>
                        {/* <a key={index} className="nav-link" href={link.link}>{link.name}</a> */}
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

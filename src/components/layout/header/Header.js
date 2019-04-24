import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Avatar from "../avatar/Avatar";
import './HomeHeader.css';
class Header extends Component {
  state = {
    headeTitle: this.props.headeTitle ? this.props.headeTitle : "Default"
  };
  navigateTo = (linkName) => {
    this.props.history.push(linkName);
  }
  render() {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const currentUser = JSON.parse(localStorage.getItem('user'));
    return (
      <header className="header-container">
        <div className="nav-btn">
          <div className="home-header-nav-item home-header-logo" style={{
            backgroundPosition: 'center center',
            backgroundImage:
              'url(\'../../Assets/hdpi/logo.png\')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
          }} onClick={() => this.navigateTo('/home')} ></div>
         
         
        </div>
         {user && <div className="home-header-nav-item home-header-nav-item--position"><Avatar userProfile={user} currentUser={currentUser}></Avatar></div>}
      </header>
    );
  }
}

export default withRouter(connect(
  null,
  null
)(Header));


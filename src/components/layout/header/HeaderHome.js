import React, { Component } from "react";
import './HomeHeader.css'
class HeaderHome extends Component {
  state = {
    headeTitle: this.props.headeTitle ? this.props.headeTitle : "Default"
  };
  render() {
    return (
      <header className="header-container">
        <div className="home-header-nav-item"><img src=""></img></div>
        <div className="home-header-nav-item">Contact Us</div>
        <div className="home-header-nav-item">About Us</div>
        <div className="home-header-nav-item">SignIn/SignUp</div>
      </header>
    );
  }
}

export default HeaderHome;

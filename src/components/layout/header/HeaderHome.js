import React, { Component } from "react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import './HomeHeader.css';

class HeaderHome extends Component {
  state = {
    headeTitle: this.props.headeTitle ? this.props.headeTitle : "Default",
    dashboardLink : '/home'
  };
  componentDidMount = () => {
     const user = JSON.parse(localStorage.getItem('userProfile'));
    if (user) {
      if (user.role === 'Teacher') {
        this.setState({ dashboardLink: '/teacher' });
      } else if (user.role === 'Student') {
        this.setState({ dashboardLink: '/student' });
      } else {
        this.setState({ dashboardLink: '/admin' });
      }
    } else {
      this.setState({ dashboardLink: '/login' });
    }
  };
  navigateTo = (linkName)=>{
    this.props.history.push(linkName);
  }

  render() {
    let userLink;
    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (user) {
      userLink = <div className="home-header-nav-item home-header-nav-item--position"><a onClick={() => this.navigateTo(this.state.dashboardLink)} className="home-header-link"><i className="fa fa-tasks home-header-icon--size"></i> <span className="home-header-text-link-status">Dashboard</span></a></div>;
    } else {
      userLink = <div className="home-header-nav-item home-header-nav-item--position"><a onClick={() => this.navigateTo(this.state.dashboardLink)} className="home-header-link"><i className="fa fa-sign-in home-header-icon--size"></i> <span className="home-header-text-link-status">SignIn/SignUp</span></a></div>;
    }
    return (
      <header className="header-container">
        <div className="home-header-nav-item home-header-logo" style={{
          backgroundPosition: 'center center',
          backgroundImage:
            'url(' + '../../Assets/hdpi/logo.png ' + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        }} onClick={() => this.navigateTo('/home')} ></div>
        <div>
          {userLink}
          <div className="home-header-nav-item home-header-nav-item--position"><a onClick={() => this.navigateTo('/contactus')} className="home-header-link"><i className="fa fa-phone-square home-header-icon--size"></i> <span className="home-header-text-link-status">Contact Us</span></a></div>
          <div className="home-header-nav-item home-header-nav-item--position"><a onClick={() => this.navigateTo('/aboutus')} className="home-header-link"><i className="fa fa-info-circle home-header-icon--size"></i> <span className="home-header-text-link-status">About Us</span></a></div>
        </div>
      </header>
    );
  }
}

export default withRouter(connect(
  null,
  null
)(HeaderHome));

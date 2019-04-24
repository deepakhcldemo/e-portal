import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import "./HomeHeader.css";
import Avatar from "../avatar/Avatar";

class HeaderHome extends Component {
  state = {
    headeTitle: this.props.headeTitle ? this.props.headeTitle : "Default",
    dashboardLink: "/home"
  };
  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (user) {
      if (user.role === "Teacher") {
        this.setState({ dashboardLink: "/teacher" });
      } else if (user.role === "Student") {
        this.setState({ dashboardLink: "/student" });
      } else {
        this.setState({ dashboardLink: "/admin" });
      }
    } else {
      this.setState({ dashboardLink: "/login" });
    }
  };
  navigateTo = linkName => {
    console.log(linkName);
    this.props.history.push(linkName);
  };

  render() {
    let userLink;
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (user) {
      userLink = (
        <div className="home-header-nav-item home-header-nav-item--position">
          <Avatar userProfile={user} currentUser={currentUser} />
        </div>
      );
    } else {
      userLink = (
        <div className="home-header-nav-item home-header-nav-item--position">
          <a
            onClick={() => this.navigateTo(this.state.dashboardLink)}
            className="home-header-link"
            href="#"
          >
            <i className="fa fa-sign-in home-header-icon--size" />{" "}
            <span className="home-header-text-link-status">SignIn/SignUp</span>
          </a>
        </div>
      );
    }
    const { dashboardLinks } = this.props;
    return (
      <header className="header-container">
        <div
          className="home-header-nav-item home-header-logo"
          style={{
            backgroundPosition: "center center",
            backgroundImage: "url(" + "../../Assets/hdpi/logo.png " + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
          }}
          onClick={() => this.navigateTo("/home")}
        />
        <div>
          {userLink}
          {!dashboardLinks && (
            <>
              <div className="home-header-nav-item home-header-nav-item--position">
                <a
                  onClick={() => this.navigateTo("/contactus")}
                  className="home-header-link"
                >
                  <i className="fa fa-phone-square home-header-icon--size" />{" "}
                  <span className="home-header-text-link-status">
                    Contact Us
                  </span>
                </a>
              </div>
              <div className="home-header-nav-item home-header-nav-item--position">
                <a
                  onClick={() => this.navigateTo("/aboutus")}
                  className="home-header-link"
                >
                  <i className="fa fa-info-circle home-header-icon--size" />{" "}
                  <span className="home-header-text-link-status">About Us</span>
                </a>
              </div>
            </>
          )}
          {dashboardLinks &&
            dashboardLinks.map((link, index) => {
              return (
                <div
                  key={index}
                  className="home-header-nav-item home-header-nav-item--position home-header-text-link-status"
                >
                  <NavLink
                    to={link.link}
                    exact
                    activeClassName=""
                    className="home-header-link"
                    title={link.title}
                  >
                    <i className={link.icon} aria-hidden="true" />
                    <span
                      className="home-header-text-link-status"
                      style={link.style}
                    >
                      {link.name}
                    </span>
                  </NavLink>
                </div>
              );
            })}
        </div>
      </header>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(HeaderHome)
);

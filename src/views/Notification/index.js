import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Navbar from "./../../shared/components/Navbar";

import HeaderHome from "../../components/layout/header/HeaderHome";

import { getNotificationsFromDB } from "../../database/dal/firebase/studentDal";

import TeacherNotificationDetails from "./../Teacher/Notification/notificationsDetails";

import NotificationsDetails from "./../Student/Notification/notificationsDetails";

import { setNotificationDetails } from "./action";
import { TEACHER_DASHBOARD_LINKS } from "../../constant/Constant";
import "./notification.css";

// import Modal from 'react-responsive-modal'

class Notification extends Component {
  state = {
    key: "chatNotification",
    open: false,
    userDetails: "",
    notificationsList: ""
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userProfile"))
    });
  };

  componentDidMount = () => {
    const { userDetails } = this.state;
    getNotificationsFromDB(userDetails.userId, userDetails.role).onSnapshot(
      querySnapshot => {
        let notificationsList = [];
        querySnapshot.forEach(doc => {
          notificationsList.push(Object.assign({ id: doc.id }, doc.data()));
        });
        this.setState({ notificationsList });
      }
    );
  };

  notificationStatus = (notificationDetails, type) => {
    const { userDetails } = this.state;
    const classStatus =
      notificationDetails.sstatus && notificationDetails.tstatus
        ? "alert alert-success"
        : notificationDetails.status && !notificationDetails.tstatus
        ? "alert alert-warning"
        : "alert alert-danger";
    const userWiseStatus =
      userDetails.role === "Teacher"
        ? `Notification from  ${notificationDetails.sname}`
        : `Notification from  ${notificationDetails.tname}`;
    return type === "message" ? userWiseStatus : classStatus;
  };

  goToNotificationDetails = notification => {
    this.props.setNotificationDetails(notification);
    console.log(this.props);
    this.props.history.push("/notificationDetails");
  };

  notificationStatus = (notificationDetails, type) => {
    const { userDetails } = this.state;
    let classStatus = "";
    if (notificationDetails.sstatus && notificationDetails.tstatus) {
      classStatus = "alert alert-success";
    }

    if (notificationDetails.sstatus && !notificationDetails.tstatus) {
      classStatus = "alert alert-warning";
    }

    if (!notificationDetails.sstatus && !notificationDetails.tstatus) {
      classStatus = "alert alert-danger";
    }
    const userWiseStatus =
      userDetails.role === "Teacher"
        ? `Notification from  ${notificationDetails.sname}`
        : `Notification from  ${notificationDetails.tname}`;
    return type === "message" ? userWiseStatus : classStatus;
  };

  goToNotificationDetails = notification => {
    this.props.setNotificationDetails(notification);
    console.log(this.props);
    this.props.history.push("/notificationDetails");
  };

  render = () => {
    const { notificationsList, userDetails } = this.state;

    return (
      <div className="container-fluid">
        <HeaderHome
          headeTitle="Notification"
          dashboardLinks={TEACHER_DASHBOARD_LINKS}
        />

        <div className="content-container">
          <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
            <Tabs
              id="tabs"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
            >
              <Tab eventKey="chatNotification" title="Chat Notification">
                <div className="card notification-container">
                  <div className="card-body notification-container">
                    {userDetails.role === "Teacher" && (
                      <TeacherNotificationDetails />
                    )}
                    {userDetails.role === "Student" && <NotificationsDetails />}
                  </div>
                </div>
              </Tab>
              <Tab eventKey="notification" title="Notification">
                <div className="card notification-container">
                  <div className="card-body notification-container">
                    {notificationsList &&
                      notificationsList.map((notification, ind) => {
                        return (
                          <div className="container" key={ind}>
                            <div
                              className={this.notificationStatus(
                                notification,
                                "classes"
                              )}
                              onClick={() =>
                                this.goToNotificationDetails(notification)
                              }
                            >
                              <div className="container">
                                <b>Message:</b>{" "}
                                {this.notificationStatus(
                                  notification,
                                  "message"
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="col-12 main-wrapper">
          <Navbar />
        </div>
      </div>
    );
  };
}
const mapStateToProps = state => {
  return {
    //savedNotifications: state.notifyTeacherReducer.notifications
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setNotificationDetails: details => dispatch(setNotificationDetails(details))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Notification)
);

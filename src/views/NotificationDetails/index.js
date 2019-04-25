import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import NavBar from "../../shared/components/Navbar";

import HeaderHome from "../../components/layout/header/HeaderHome";
import { rejectNotification, openModalForAcceptNotification } from "./action";
import ModalPopUpForNotification from "../../shared/components/modalPopforNotification/modalPopForNotification";
import {
  TEACHER_DASHBOARD_LINKS,
  STUDENT_DASHBOARD_LINKS
} from "./../../constant/Constant";
import "./notificationDetails.css";

class NotificationDetails extends Component {
  state = {
    notificationsDetails: [],
    userDetails: {}
  };

  acceptNotification = () => {
    this.props.openModalForAcceptNotification();
  };

  rejectNotification = () => {
    const rejectNotification = { ...this.state.notificationsDetails };
    rejectNotification.tstatus = false;
    this.props.rejectNotification(rejectNotification);
    this.props.history.goBack();
  };
  componentWillMount = () => {
    const UserProfile = JSON.parse(localStorage.getItem("userProfile"));
    console.log(this.props.notificationDetails, "inComponentDidMout");
    this.setState({
      notificationsDetails: this.props.notificationDetails,
      userDetails: UserProfile
    });
    console.log(this.state);
  };

  backToNotification = () => {};
  render() {
    return (
      <div className="container-fluid">
        <HeaderHome
          headeTitle="Teacher Dashboard"
          dashboardLinks={TEACHER_DASHBOARD_LINKS}
        />

        <div className="content-container">
          <div className="card col-lg-8" style={{ margin: "auto" }}>
            <div>
              <span className="bold">
                Notification Description :{" "}
                {this.state.notificationsDetails.notificationDesc}
              </span>
            </div>
            <div>
              {" "}
              <span className="bold"> Video upload BY :</span>{" "}
              {this.state.userDetails.role === "Teacher"
                ? "Student"
                : "Teacher"}
            </div>
            <ModalPopUpForNotification
              teacherNotofication={this.state.notificationsDetails}
            />
            <video
              src={
                this.state.notificationsDetails.sVideo ||
                this.state.notificationsDetails.tVideo
              }
            />
            {this.state.userDetails.role === "Teacher" ? (
              <div className="col-lg-12">
                <div className="pull-left">
                  <button
                    className="btn btn-dark"
                    onClick={() => this.props.history.goBack()}
                  >
                    Back
                  </button>
                </div>
                <div className="pull-right">
                  <button
                    className="btn btn-success"
                    onClick={this.acceptNotification}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.rejectNotification}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    notificationDetails: state.notificationDetials.notificationDetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    rejectNotification: rejectedNotificationData =>
      dispatch(rejectNotification(rejectedNotificationData)),
    openModalForAcceptNotification: () =>
      dispatch(openModalForAcceptNotification())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationDetails)
);

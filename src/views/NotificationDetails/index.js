import React, { Component } from "react";
import { Link } from "react-router-dom";
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import NavBar from "../../shared/components/Navbar";
import { getVideoUrl } from '../../database/dal/firebase/notificationdal';
import HeaderHome from "../../components/layout/header/HeaderHome";
import { rejectNotification, openModalForAcceptNotification, saveAcceptedNotification, setKeyForNotificationPage } from "./action";
import ModalPopUpForNotification from "../../shared/components/modalPopforNotification/modalPopForNotification";
import {
  TEACHER_DASHBOARD_LINKS,
  STUDENT_DASHBOARD_LINKS
} from "./../../constant/Constant";
import "./notificationDetails.css";

class NotificationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsDetails: [],
      userDetails: {},
      applyClass: 'display-upload',
      isUploading: false,
      videoName: '',
      validationMessage: ''
    };
    this.acceptNotification = this.acceptNotification.bind(this);
    this.goBackTONotification = this.goBackTONotification.bind(this);
  }
  goBackTONotification = () => {
    this.props.setKeyForNotificationPage('NotificationDetails');
    this.props.history.goBack()
  }
  acceptNotification = () => {
    //this.props.openModalForAcceptNotification();
    this.state.applyClass = 'display-upload' ? this.setState({ applyClass: '' }) : "";
    if (this.state.videoName !== '') {
      const acceptNotification = { ...this.state.notificationsDetails };
      acceptNotification.tstatus = true;
      acceptNotification.sstatus = true;

      getVideoUrl(this.state.videoName).then(url => {
        if (url !== "" && acceptNotification.notificationDesc !== '') {
          acceptNotification.tvideo = url;
          acceptNotification.tAccepted = true;
          this.props.saveAcceptedNotification(acceptNotification);
          this.setState({
            validationMessage: ''
          })
        }

      })
      this.goBackTONotification();
    }



  };

  rejectNotification = () => {
    const rejectNotification = { ...this.state.notificationsDetails };
    rejectNotification.tstatus = false;
    rejectNotification.sstatus = false;
    rejectNotification.tRejected = true;
    this.props.rejectNotification(rejectNotification);
    this.goBackTONotification();
  };
  componentWillMount = () => {
    const UserProfile = JSON.parse(localStorage.getItem("userProfile"));
    console.log(this.props.notificationDetails, "inComponentDidMout");
    this.setState({
      notificationsDetails: this.props.notificationDetails,
      userDetails: UserProfile
    });
  };
  handleUploadStart = () => {
    debugger
    this.setState({
      isUploading: true,

    })
  }
  handleVideoUploadSuccess = fileName => {
    this.setState({
      isUploading: false,
      videoName: fileName
    })
  };

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


              {this.state.userDetails.Svideo !== '' ? <span className="bold"> Video Uploaded by Student </span> : null}
            </div>
            <div className="teacher-video">
              <video
                controls
                src={
                  this.state.notificationsDetails.sVideo
                }
              />
            </div>
            {this.props.notificationDetails.tvideo !== '' ? (
              <div>
                <div>
                  <span className="bold"> Video Uploaded by Teacher </span>
                </div>
                <div className="teacher-video">
                  <video
                    controls
                    src={
                      this.state.notificationsDetails.tvideo
                    }
                  /> </div>
              </div>) : null}
            <div className={this.state.applyClass}>
              <p>Please Upload you video here : </p>
              <FileUploader
                accept='video/*'
                className="upload-video"
                storageRef={firebase.storage().ref(`notification/${this.props.notificationDetails.loggedInUserId}`)}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleVideoUploadSuccess}
                onProgress={this.handleProgress}
              />
              <p>{this.state.validationMessage}</p>
            </div>

            <div className="col-lg-12">
              <div className="pull-left">
                <button
                  className="btn btn-dark"
                  onClick={this.goBackTONotification}
                >
                  Back
                  </button>
              </div>
              {(this.state.userDetails.role === "Teacher") && (!this.state.notificationsDetails.tRejected && !this.state.notificationsDetails.tAccepted) ? (
                <div className="pull-right">
                  <button
                    disabled={this.state.isUploading}
                    className="btn btn-success"
                    onClick={this.acceptNotification}
                  >
                    Accept
                  </button>
                  <button disabled={this.state.isUploading}
                    className="btn btn-danger"
                    onClick={this.rejectNotification}
                  >
                    Reject
                  </button>
                </div>
              ) : ''}



              {(this.state.notificationsDetails.tRejected) ? (
                <p className="notification-rejected">Notification has been Rejected</p>
              ) : ''}

              {(this.state.notificationsDetails.tAccepted && this.state.userDetails.role !== "Teacher") ? (
                <div>
                  <button disabled={this.state.isUploading}
                    className="btn btn-success pull-right"
                    onClick={true}
                  >
                    Pay Now
               </button>
                </div>
              ) : ''}
            </div>

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
      dispatch(openModalForAcceptNotification()),
    saveAcceptedNotification: (acceptNotificationData) =>
      dispatch(saveAcceptedNotification(acceptNotificationData)),
    setKeyForNotificationPage: (NotificationDetails) => dispatch(setKeyForNotificationPage(NotificationDetails))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationDetails)
);

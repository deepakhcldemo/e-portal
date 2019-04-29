import React, { Component } from "react";
import { Link } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import NavBar from "../../shared/components/Navbar";
import Progress from "./progress";
import { getVideoUrl } from "../../database/dal/firebase/notificationdal";
import HeaderHome from "../../components/layout/header/HeaderHome";
import {
  rejectNotification,
  openModalForAcceptNotification,
  saveAcceptedNotification,
  setKeyForNotificationPage
} from "./action";
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
      applyClass: "display-upload",
      isUploading: false,
      videoName: "",
      validationMessage: ""
    };
    this.acceptNotification = this.acceptNotification.bind(this);
    this.goBackTONotification = this.goBackTONotification.bind(this);
  }
  goBackTONotification = () => {
    this.props.setKeyForNotificationPage("NotificationDetails");
    this.props.history.goBack();
  };
  acceptNotification = () => {
    //this.props.openModalForAcceptNotification();
    this.state.applyClass = "display-upload"
      ? this.setState({ applyClass: "" })
      : "";
    if (this.state.videoName !== "") {
      const acceptNotification = { ...this.state.notificationsDetails };
      acceptNotification.tstatus = true;
      acceptNotification.sstatus = true;

      getVideoUrl(this.state.videoName, acceptNotification.loggedInUserId).then(
        url => {
          if (url !== "" && acceptNotification.notificationDesc !== "") {
            acceptNotification.tvideo = url;
            acceptNotification.tAccepted = true;
            this.props.saveAcceptedNotification(acceptNotification);
            this.setState({
              validationMessage: ""
            });
          }
        }
      );
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
  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      progress: 0
    });
  handleProgress = progress => this.setState({ progress });
  handleVideoUploadSuccess = fileName => {
    this.setState({
      progress: 100,
      isUploading: false,
      videoName: fileName
    });
  };

  render() {
    let badgeText = "";
    let classNameBadge = "";
    if (
      this.props.notificationDetails.sstatus &&
      !this.props.notificationDetails.tstatus
    ) {
      badgeText = "Pending";
      classNameBadge = "badge-warning";
    }
    if (this.props.notificationDetails.tRejected) {
      badgeText = "Rejected";
      classNameBadge = "badge-danger";
    }
    if (this.props.notificationDetails.tAccepted) {
      badgeText = "Success";
      classNameBadge = "badge-success";
    }
    return (
      <div className="container-fluid">
        <HeaderHome
          headeTitle="Teacher Dashboard"
          dashboardLinks={TEACHER_DASHBOARD_LINKS}
        />

        <div className="content-container">
          <div
            className="card request-notification-container col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10"
            style={{ margin: "auto" }}
          >
            <div className="card-body request-notification-container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-without--padding heading--padding">
                  <span className="bold">Notification Description :</span>
                  {this.state.notificationsDetails.notificationDesc}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-without--padding badge-container">
                  <div class={"badge" + " " + classNameBadge}>{badgeText}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-without--padding heading--padding">
                  {this.state.userDetails.Svideo !== "" ? (
                    <span className="bold"> Video Uploaded by Student </span>
                  ) : null}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-without--padding teacher-video">
                  <video
                    controls
                    src={this.state.notificationsDetails.sVideo}
                    className="video-style"
                  />
                </div>
                {this.props.notificationDetails.tvideo !== "" ? (
                  <>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-without--padding heading--padding">
                      <span className="bold"> Video Uploaded by Teacher </span>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-without--padding teacher-video">
                      <video
                        controls
                        src={this.state.notificationsDetails.tvideo}
                        className="video-style"
                      />{" "}
                    </div>
                  </>
                ) : null}
              </div>

              <div className={"row " + this.state.applyClass}>
                <div className="col-12 heading--padding">
                  <p>Please Upload you video here : </p>

                  <FileUploader
                    accept="video/*"
                    className="upload-video"
                    storageRef={firebase
                      .storage()
                      .ref(
                        `notification/${
                          this.props.notificationDetails.loggedInUserId
                        }`
                      )}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleVideoUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                  <div className="progressbar-spacing">
                    {this.state.isUploading && (
                      <Progress
                        bgColor="#232838"
                        progress={this.state.progress}
                      />
                    )}
                  </div>
                  <p>{this.state.validationMessage}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="pull-left">
                    <button
                      className="btn btn-dark"
                      onClick={this.goBackTONotification}
                    >
                      Back
                    </button>
                  </div>
                  {this.state.userDetails.role === "Teacher" &&
                  (!this.state.notificationsDetails.tRejected &&
                    !this.state.notificationsDetails.tAccepted) ? (
                    <div className="pull-right">
                      <button
                        disabled={this.state.isUploading}
                        className="btn btn-success"
                        onClick={this.acceptNotification}
                      >
                        Accept
                      </button>
                      <button
                        disabled={this.state.isUploading}
                        className="btn btn-danger"
                        onClick={this.rejectNotification}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* {this.state.notificationsDetails.tRejected ? (
                <p className="notification-rejected">
                  Notification has been Rejected
                </p>
              ) : (
                ""
              )} */}

                  {this.state.notificationsDetails.tAccepted &&
                  this.state.userDetails.role !== "Teacher" ? (
                    <div>
                      <button
                        disabled={true}
                        className="btn btn-success pull-right"
                      >
                        Pay Now
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
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
    saveAcceptedNotification: acceptNotificationData =>
      dispatch(saveAcceptedNotification(acceptNotificationData)),
    setKeyForNotificationPage: NotificationDetails =>
      dispatch(setKeyForNotificationPage(NotificationDetails))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationDetails)
);

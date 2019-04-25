import React, { Component } from "react";
import NavBar from "../../../shared/components/Navbar";
import { connect } from "react-redux";
// import {  getNotifications } from './action';
import "./notification.css";
import { getNotificationsFromDB } from "./../../../database/dal/firebase/studentDal";
class teacherNotificationFulldetails extends Component {
  state = {};

  componentDidMount = () => {
    getNotificationsFromDB().onSnapshot(querySnapshot => {
      let notifyData = [];
      querySnapshot.forEach(doc => {
        notifyData.push(doc.data());
      });

      if (notifyData.length > 0) {
        this.setState({
          notificationslistNewlyItems: notifyData
        });
      }
      notifyData = [];
    });
  };

  render() {
    const { notificationslistNewlyItems } = this.state;
    console.log("notificationslistNewlyItems", notificationslistNewlyItems);
    return (
      <div className="container-fluid">
        <NavBar />
        <div className="row margin-bottom">
          <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
            <div className="card notification-container">
              <div className="card-body">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    />
                    <h4 class="modal-title" id="myModalLabel">
                      More About Notification
                    </h4>
                  </div>
                  <div class="modal-body">
                    <center>
                      <img
                        alt=""
                        src="../Assets/hdpi/avatar.png"
                        name="aboutme"
                        width="140"
                        height="140"
                        border="0"
                        class="img-circle"
                      />
                      <h3 class="media-heading">
                        Bob Joe <small>USA</small>
                      </h3>
                    </center>
                    <span>
                      <strong>Date: </strong>
                    </span>
                    <span class="label label-warning">4/22/2019</span> &nbsp;
                    <span>
                      <strong>Timing: </strong>
                    </span>
                    <span class="label label-info">9:00 AM</span>
                    &nbsp;
                    <span>
                      <strong>Duration: </strong>
                    </span>
                    <span class="label label-info">30 Min</span>
                    <p class="text-left">
                      <strong>Message: </strong>
                      Hey Kately, Good to see you. I have accepted your offer.
                      Please pay for further process.
                    </p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-success"
                      data-dismiss="modal"
                    >
                      Pay
                    </button>
                  </div>
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
    // notifyRows: state.notifyTeacherReducer.notifyTeacherData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //  getNotification: () => dispatch(getNotification()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(teacherNotificationFulldetails);

import React, { Component } from 'react';
import { connect } from "react-redux";
import NavBar from '../../../shared/components/Navbar';
import { saveChatNotificationDetails, udpateChatNotificationDetails, getNotificationDataFromNid } from '../../../database/dal/firebase/chatNotificationDal';

import { getNotification, getTeachers, getStudents } from '../../Teacher/Notification/notificationAction';

import UpdateDataModal from '../../../shared/components/calendar-modal/updateDataModal';

class notificationsDescription extends Component {
    state = {
        calendarModal: false,
        teacherData: '',
        notificationData: ''
    };

    componentDidMount() {
        console.log("Params Ids => ", this.props.match.params)
        let user;
        //this.props.getNotification(this.props.match.params.sid);
        //this.props.getTeachers(this.props.match.params.sid);
        //this.props.getStudents(this.props.match.params.sid);
        getNotificationDataFromNid(this.props.match.params.sid).then(querySnapshot => {
            querySnapshot.forEach(doc => {
                user = doc.data();
                console.log("getNotificationDataFromNid", user)
                if (doc.exists) {
                    this.setState({
                        notificationData: user
                    });


                }
            });
        });
    }

    wrapperFunction = (data) => {
        this.openCalendarModal();
        this.setStudentData(data);
    }
    openCalendarModal = () => {
        this.setState({ calendarModal: true });
    }
    setStudentData = (data) => {
        this.setState({ studentData: data });
    }
    closeCalendarModal = () => {
        this.setState({ calendarModal: false });
    }

    //get the user all data and save it again
    handleReject = (id) => {
        console.log("Rejected", id)
        const updatedAt = new Date();
        const createdAt = new Date();
        const loggedInUSer = JSON.parse(localStorage.getItem('user'));
        if (loggedInUSer) {
            const rejectedNotificationDetails = {
                nId: id,
                updatedAt,
                status: 0,
                comment: [{
                    "by": loggedInUSer.user.uid,
                    "date": createdAt,
                    "details": "Hey, I have rejected chat offer. I am out during this week."
                }]
            }
            udpateChatNotificationDetails({
                ...rejectedNotificationDetails
            })

        }

    }

    handlePay = (id) => {
        console.log("Pay", id)
        const updatedAt = new Date();
        const createdAt = new Date();
        const loggedInUSer = JSON.parse(localStorage.getItem('user'));
        if (loggedInUSer) {
            const acceptedNotificationDetails = {
                nId: id,
                updatedAt,
                status: 1,
                paymentStatus: true
            }
            udpateChatNotificationDetails({
                ...acceptedNotificationDetails
            })
        }
    }

    handleBack = () => {
        this.props.history.push("/notification");
    }


    render() {
        const { notificationData } = this.state;
        console.log("Notification data Student Description => ", notificationData)

        const { open } = this.state;
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="row margin-bottom">
                    <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                {
                                    this.props.notificationDetails != null ?

                                        <div className="modal-content">

                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                                                <h4 className="modal-title" id="myModalLabel">More About Student {notificationData.nId} Notification {this.props.notificationDetails["scheduleDate"]}</h4>
                                            </div>
                                            <div className="modal-body">
                                                <center>
                                                    <img src="../Assets/avatar.png" name="aboutme" width="140" height="140" border="0" className="img-circle" />
                                                    <h3 className="media-heading"></h3>
                                                </center>
                                                <span><strong>Date & Timing: </strong></span>
                                                <span className="label label-warning">{notificationData.scheduleDate}</span> &nbsp;


    <p className="text-left"><strong>Message: </strong>
                                                    {notificationData.comment != null ?
                                                        Object.keys(notificationData.comment).map(notifyData => (
                                                            notificationData.comment[notifyData].details

                                                        )) : <span>Loading...</span>
                                                    }
                                                </p>


                                            </div>
                                            <div className="modal-footer">

                                                <button onClick={this.handleBack} type="button" className="btn btn-primary" data-dismiss="modal">Back</button>
                                                {notificationData.status == -1 && notificationData.reqForReSchedule === true ? <button onClick={() => this.handleReject(notificationData.nId)} type="button" className="btn btn-danger" data-dismiss="modal">Reject</button> : null}
                                                {((notificationData.paymentStatus == false && notificationData.status == 1) || (notificationData.status == -1 && notificationData.reqForReSchedule === true && notificationData.paymentStatus == false)) ? <button onClick={() => this.handlePay(notificationData.nId)} type="button" className="btn btn-success" data-dismiss="modal">Pay</button> : null}



                                            </div>








                                        </div>

                                        : <div>Loading....</div>


                                }

                            </div></div></div></div></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notificationDetails: state.notificationReducer.notificationDetails,
        teacherDetails: state.notificationReducer.teacherDetails,
        studentDetails: state.notificationReducer.studentDetails,

    }
}
const mapDispatchToProps = dispatch => {

    return {
        getNotification: (uid) => dispatch(getNotification(uid)),
        getTeachers: (uid) => dispatch(getTeachers(uid)),
        getStudents: (uid) => dispatch(getStudents(uid)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(notificationsDescription);

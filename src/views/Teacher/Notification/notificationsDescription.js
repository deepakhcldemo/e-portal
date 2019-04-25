import React, { Component } from 'react';
import { connect } from "react-redux";
import NavBar from '../../../shared/components/Navbar';
import { saveChatNotificationDetails, udpateChatNotificationDetails, getNotificationDataFromNid } from '../../../database/dal/firebase/chatNotificationDal';
import { getNotification, getTeachers, getStudents } from './notificationAction';

import UpdateDataModal from '../../../shared/components/calendar-modal/updateDataModal';

class notificationsDescription extends Component {
    state = {
        calendarModal: false,
        teacherData: '',
        notificationData: ''
    };


    componentDidMount() {
        console.log("notificationsDescription componentDidMount props", this.props.match.params);
        let user;
        getNotificationDataFromNid(this.props.match.params.nid).then(querySnapshot => {
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
        //this.props.getNotification(this.props.match.params.nid);
        //this.props.getTeachers(this.props.match.params.nid);
        //this.props.getStudents(this.props.match.params.nid);
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
                    "details": "Hey, I have rejected chat offer. I am during this week."
                }]
            }
            udpateChatNotificationDetails({
                ...rejectedNotificationDetails
            })

        }

    }

    handleAccept = (id) => {
        console.log("Accepted", id)
        const updatedAt = new Date();
        const createdAt = new Date();
        const loggedInUSer = JSON.parse(localStorage.getItem('user'));
        if (loggedInUSer) {
            const acceptedNotificationDetails = {
                nId: id,
                updatedAt,
                status: 1,
                comment: [{
                    "by": loggedInUSer.user.uid,
                    "date": createdAt,
                    "details": "Hey, I have accepted chat offer. Let's meet on time."
                }]
            }
            udpateChatNotificationDetails({
                ...acceptedNotificationDetails
            })
        }
    }

    handleBack = () => {
        this.props.history.push("/teacher/notificationsDetails");
    }


    render() {
        const { notificationData } = this.state;
        console.log("Notification data Student Description => ", notificationData)
        console.log("Notification Comment Data ---------", notificationData.comment)
        if (notificationData.comment != null) {
            Object.keys(notificationData.comment).map(notifyData => {
                //Object.keys(this.props.notificationDetails[notifyData].comment).map(data => {
                console.log("---notifyData----", notificationData.comment[notifyData].details)
                // })

            })
        }
        // const datas = this.props.studentDetails
        //console.log("Student Details => ", this.getStudentData());
        // datas.map(data => {
        //     console.log(data)
        // })
        // if (this.props.studentDetails != null) {
        //     this.props.studentDetails.map(data => {
        //         console.log(data)
        //     })
        // }

        //console.log("Student Details => ", this.props.studentDetails)



        const { open } = this.state;
        //console.log(this.props.match.params.nid)
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="row margin-bottom">
                    <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                {
                                    notificationData != null ?
                                        <div className="modal-content">

                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                                                <h4 className="modal-title" id="myModalLabel">More About Student {notificationData.nid} Notification</h4>
                                            </div>
                                            <div className="modal-body">
                                                <center>
                                                    <img src="../Assets/avatar.png" name="aboutme" width="140" height="140" border="0" className="img-circle" />
                                                    <h3 className="media-heading">{notificationData.nid}</h3>
                                                </center>
                                                <span><strong>Date & Timing: </strong></span>
                                                <span className="label label-warning">{notificationData.scheduleDate}</span> &nbsp;


                                                <p className="text-left"><strong>Message: </strong>
                                                    {notificationData.details}.</p>


                                            </div>
                                            <div className="modal-footer">

                                                <button onClick={this.handleBack} type="button" className="btn btn-primary" data-dismiss="modal">Back</button>

                                                <button onClick={() => this.handleAccept(this.props.match.params.nid)} type="button" className="btn btn-success" data-dismiss="modal">Accept</button>

                                                <button onClick={() => this.handleReject(this.props.match.params.nid)} type="button" className="btn btn-danger" data-dismiss="modal">Reject</button>

                                                <button onClick={() => this.wrapperFunction(this.props.match.params.nid)} type="button" className="btn btn-warning" data-dismiss="modal">Discuss on Time</button>

                                            </div>





                                            <div>
                                                <UpdateDataModal notificationId={this.state.studentData} modalState={this.state.calendarModal} closeCalendarModal={this.closeCalendarModal} classes="calendar-modal"></UpdateDataModal>

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

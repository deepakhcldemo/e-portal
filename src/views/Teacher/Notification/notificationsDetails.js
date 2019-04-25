import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../shared/components/Navbar';
import { connect } from "react-redux";
import { getTeachers, getStudents, getTeacherNotification } from './notificationAction';



class NotificationsDetails extends Component {

    state = {
        open: false,
    };

    componentDidMount() {
        const loggedInUSer = JSON.parse(localStorage.getItem('user'));
        this.props.getTeacherNotification(loggedInUSer.user.uid);
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    getClassName(status) {
        let alertClassName;
        if (status === -1) {
            alertClassName = "alert alert-warning"
        }
        if (status === 0) {
            alertClassName = "alert alert-danger"
        }
        if (status === 1) {
            alertClassName = "alert alert-success"
        }
        return alertClassName;
    }
    render = () => {
        const { open } = this.state;
        const { notificationDetails } = this.props;
        return (
            <>
                <div className="container-fluid">
                    <NavBar />
                    <div className="row margin-bottom">
                        <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    {Object.keys(notificationDetails).map((notificationDetail, ind) => (

                                        <Link key={ind} to={`/teacher/notificationsDescription/` + notificationDetails[notificationDetail].nId}>
                                            <div className={this.getClassName(notificationDetails[notificationDetail].status)}>
                                                <div style={{ float: "left" }}><img src="../Assets/hdpi/userProfile.png" name="aboutme" width="70" height="50" border="0" className="img-circle" /></div>
                                                <div className="container" onClick={this.onOpenModal} style={{ cursor: "pointer" }}>

                                                    <div className="alert-icon">
                                                        <i className="material-icons">Student {notificationDetails[notificationDetail].sId}</i>
                                                    </div>
                                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true"><i className="material-icons">clear</i></span>
                                                    </button>

                                                    <b>Message:</b> {notificationDetails[notificationDetail].details}..
                                        </div>
                                            </div>

                                        </Link>
                                    ))
                                    }



                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
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
    console.log("dispatched action")
    return {
        getTeacherNotification: (uid) => dispatch(getTeacherNotification(uid)),
        getTeachers: (uid) => dispatch(getTeachers(uid)),
        getStudents: (uid) => dispatch(getStudents(uid)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsDetails);


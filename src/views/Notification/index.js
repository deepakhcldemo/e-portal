import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import { connect } from "react-redux";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Navbar from "./../../shared/components/Navbar";
import HeaderHome from "../../components/layout/header/HeaderHome";
import { getNotificationsFromDB } from "../../database/dal/firebase/studentDal";
import { TEACHER_DASHBOARD_LINKS, STUDENT_DASHBOARD_LINKS } from './../../constant/Constant'
import TeacherNotificationDetails from './../Teacher/Notification/notificationsDetails';
import NotificationsDetails from './../Student/Notification/notificationsDetails';
// import Modal from 'react-responsive-modal'

class Notification extends Component {

    state = {
        key: 'chatNotification',
        open: false,
        userDetails: '',
        notificationsList: ''
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentWillMount = () => {
        this.setState({
            userDetails: JSON.parse(localStorage.getItem('userProfile'))
        })
    }

    componentDidMount = () => {
        const { userDetails } = this.state;
        getNotificationsFromDB(userDetails.userId, userDetails.role).onSnapshot(querySnapshot => {
            let notificationsList = [];
            querySnapshot.forEach(doc => {
                notificationsList.push(Object.assign({ id: doc.id }, doc.data()));

            });
            this.setState({ notificationsList })
        });

    };

    notificationStatus = (notificationDetails, type) => {
        const { userDetails } = this.state
        const classStatus = (notificationDetails.sstatus && notificationDetails.tstatus) ? 'alert alert-success' : (notificationDetails.status && !notificationDetails.tstatus) ? 'alert alert-warning' : 'alert alert-danger'
        const userWiseStatus = (userDetails.role === 'Teacher') ? `Notification from  ${notificationDetails.sname}` : `Notification from  ${notificationDetails.tname}`;
        return (type === 'message') ? userWiseStatus : classStatus
    }

    render = () => {
        const { notificationsList, userDetails } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <HeaderHome
                            headeTitle="Teacher Dashboard"
                            dashboardLinks={TEACHER_DASHBOARD_LINKS}
                        />
                    </div>
                </div>
                <div className="row margin-bottom">
                    <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4>Notification</h4><hr />
                                <Tabs
                                    id="tabs"
                                    activeKey={this.state.key}
                                    onSelect={key => this.setState({ key })}
                                >
                                    <Tab eventKey="chatNotification" title="Chat Notification">
                                        {(userDetails.role === 'Teacher') && (
                                            <TeacherNotificationDetails />
                                        )}
                                        {(userDetails.role === 'Student') && (
                                            <NotificationsDetails />
                                        )}
                                    </Tab>
                                    <Tab eventKey="notification" title="Notification">
                                        {notificationsList && notificationsList.map((notification, ind) => {
                                            return (
                                            <Link key={ind} to={`/notification/details/${notification.id}`}>                                         
                                                <div className={this.notificationStatus(notification,'classes')}>
                                                    <div className="container">
                                                        <b>Message:</b> {this.notificationStatus(notification,'message')}
                                                </div>
                                                </div>
                                            </Link>
                                            )}
                                        )}                                
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    <div className="row main-wrapper">
                        <Navbar links={(userDetails.role === 'Teacher') ? TEACHER_DASHBOARD_LINKS : STUDENT_DASHBOARD_LINKS} />
                    </div>
                </div>
                <div className="row main-wrapper">
                    <Navbar links={ (userDetails.role === 'Teacher') ? TEACHER_DASHBOARD_LINKS : STUDENT_DASHBOARD_LINKS} />
                </div>      
            </div>        
        );
    }
}
export default Notification

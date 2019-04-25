import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import { connect } from "react-redux";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
 import { connect } from "react-redux";
 import { withRouter } from 'react-router';
import Navbar from "./../../shared/components/Navbar";
import HeaderHome from "../../components/layout/header/HeaderHome";
import { getNotificationsFromDB } from "../../database/dal/firebase/studentDal";
import TeacherNotificationDetails from './../Teacher/Notification/notificationsDetails';
import NotificationsDetails from './../Student/Notification/notificationsDetails';
import {setNotificationDetails} from './action';
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


    goToNotificationDetails = (notification) => {
        debugger
        this.props.setNotificationDetails(notification);
        console.log(this.props);
        this.props.history.push('/notificationDetails')
    }

    render = () => {
        const { notificationsList, userDetails } = this.state;
        const style = {
            marginTop: '20px',
            textAlign: 'center'
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <HeaderHome
                            headeTitle="Teacher Dashboard"                            
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
                                        {notificationsList.length === 0 && (
                                            <h6 style={style}>No Notifications </h6>
                                        )}
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
                                {notificationsList && notificationsList.map((notification, ind) => {
                                    return (

                                        <div className={this.notificationStatus(notification, 'classes')} onClick={() => this.goToNotificationDetails(notification)}>
                                            <div className="container">

                                                <b>Message:</b> {this.notificationStatus(notification, 'message')}
                                            </div>
                                        </div>

                                    )
                                }
                                )}

                            </div>
                        </div>
                    </div>                    
                </div>
                <div className="row main-wrapper">
                    <Navbar />
                </div>      
            </div>        
        );
    }
}
const mapStateToProps = state => {
    return {
        //savedNotifications: state.notifyTeacherReducer.notifications
    };
};
const mapDispatchToProps = dispatch => {
    return {


        setNotificationDetails: (details) => dispatch(setNotificationDetails(details))
    };
};
export default withRouter( connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification));

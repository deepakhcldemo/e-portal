import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import NavBar from '../../shared/components/Navbar'
import {rejectNotification} from './action';
// import Modal from 'react-responsive-modal'

class NotificationDetails extends Component {


   state = {
       notificationsDetails : [], 
       userDetails : {}
   }

   rejectNotification = () => {
      const rejectNotification = {...this.state.notificationsDetails};
      rejectNotification.tstatus = false;
      this.props.rejectNotification(rejectNotification);

   }
    componentWillMount = () => {
        const UserProfile = JSON.parse(localStorage.getItem('userProfile'))
        console.log(this.props.notificationDetails, 'inComponentDidMout');
        this.setState({
            notificationsDetails : this.props.notificationDetails, 
            userDetails : UserProfile
        })
        console.log(this.state);
    };

    
    render()  {
        return(
           <div> 
               Notification Description : {this.state.notificationsDetails.notificationDesc}
               Video upload BY : {this.state.userDetails.role === "Teacher" ? "Student" : "Teacher"}
                <video src = {this.state.notificationsDetails.sVideo || this.state.notificationsDetails.tVideo }></video>
                {this.state.userDetails.role === "Teacher"? <div>
                        <button >Accept</button>
                        <button onClick ={this.rejectNotification}>Reject</button>
                    </div>: null}
           </div>)
        
    }
}
const mapStateToProps = state => {
    return {
        notificationDetails : state.notificationDetials.notificationDetails
    };
};
const mapDispatchToProps = dispatch => {
    return {
        rejectNotification: (rejectedNotificationData) => dispatch(rejectNotification(rejectedNotificationData)),
       // setNotificationDetails : (details) => dispatch(setNotificationDetails(details))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationDetails);

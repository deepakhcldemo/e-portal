import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthGuard from './authguard/AuthGuard';
import { withRouter } from 'react-router';
import GLOBAL_VARIABLES from './config/config';
import './App.css';
import CreateEvent from './views/Events/events';
import Home from './views/Home';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Curriculum from './views/Curriculum';
import PasswordReset from './views/PasswordReset';
import ChangePassword from './views/ChangePassword';
import Profile from './views/Profile';
import Carousel from './components/carousel/Carousel';
import Category from './views/Category';
import Teacher from './views/Teacher';
import Video from './views/Teacher/Video';

import Notification from './views/Teacher/Notification';
import NotificationsDetails from './views/Teacher/Notification/notificationsDetails';
import NotificationsDescription from './views/Teacher/Notification/notificationsDescription';

import Student from './views/Student/index';
import StudentNotificationsDetails from './views/Student/Notification/notificationsDetails';
import StudentNotificationsDescription from './views/Student/Notification/notificationsDescription';


// import CreateNewNotification from './views/Student/NotifyStudent/createNewNotification';
import NotificationfromTeacher from './views/Student/NotifyStudent/notificationfromTeacher';
import NotificationFullDetails from './views/Student/NotifyStudent/notificationFullDetails';


import SearchTeacher from './views/Student/SearchTeacher/SearchTeacher';

import ContactUs from './views/ContactUs';
import AboutUs from './views/AboutUs';
import TeacherDetails from './views/Teacher/teacher-details/teacherDetails';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthGuard.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
          <Redirect to="/home" />
        )
    }
  />
);
class App extends Component {
  state = {
    auth: true
  };
  componentWillMount() {
    console.log('-----------------------------------------------------------');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user && this.props.location) {
      GLOBAL_VARIABLES.BASEROUTE = this.props.location.pathname;
      this.props.history.push('/home');
    }
  }
  render() {
    
    return (
      <div>
        {this.props.spinnerStatus ? (
          <div className="spinner-overlay-container">
            <div className="spinner-border text-app spinner-body" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : null}
        <ReduxToastr
          timeOut={4000}
          newestOnTop
          preventDuplicates
          position="bottom-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          {/* <Route exact path="/home/teacher/:id" component={teacherDetails} />  */}
          <Route exact path="/home/teacher/:id" render={(props) => <TeacherDetails {...props} />}/> 
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/resetPassword" component={PasswordReset} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/curriculum" component={Curriculum} />
          <PrivateRoute path="/student" component={Student} exact />
          <PrivateRoute path="/changePassword" component={ChangePassword} />
          <PrivateRoute path="/createevent" component={CreateEvent} />
          <PrivateRoute path="/carousel" component={Carousel} exact />
          <PrivateRoute path="/category" component={Category} exact />
          <PrivateRoute path="/teacher" component={Teacher} exact />
          <PrivateRoute path="/teacher/videos" component={Video} exact />
          {/* <PrivateRoute path="/student/createNewNotification" component={CreateNewNotification} exact /> */}

          <Route path="/teacher/notificationsDetails" component={NotificationsDetails} />
          <Route path="/student/notificationsDetails" component={StudentNotificationsDetails} />
          <Route path="/teacher/notificationsDescription" component={NotificationsDescription} />
          <Route path="/student/notificationsDescription" component={StudentNotificationsDescription} />

          <PrivateRoute
            path="/student/teacher"
            component={SearchTeacher}
            exact
          />
          <PrivateRoute
            path="/teacher/notifications"
            component={Notification}
            exact
          />
             <PrivateRoute
            path="/student/notifications"
            component={Notification}
            exact
          />
           <PrivateRoute
            path="/student/notificationfromTeacher"
            component={NotificationfromTeacher}
            exact
          />
             <PrivateRoute
            path="/student/notificationFullDetails"
            component={NotificationFullDetails}
            exact
          />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
App.defaultProps = {
  children: null
};
const mapStateToProps = state => {
  const loginResponse = JSON.parse(localStorage.getItem('user'));
  console.log('app state', state)
  return {
    auth: true,
    spinnerStatus: state.spinnerStatus.spinnerStatus,
    modalState: state.openModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch({ type: 'open' })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

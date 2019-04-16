import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthGuard from './authguard/AuthGuard';
import { withRouter } from 'react-router';
import GLOBAL_VARIABLES from './config/Config';
import './App.css';
import CreateEvent from './views/Events/events';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Curriculum from './views/Curriculum';
import PasswordReset from './views/PasswordReset';
import Profile from './views/Profile';
import Carousel from './components/carousel/Carousel';
import Category from './views/Category';
import Student from './views/Student/index';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthGuard.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
class App extends Component {
  state = {
    auth: true
  };
  componentWillMount() {
    console.log("-----------------------------------------------------------");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user && this.props.location) {

      GLOBAL_VARIABLES.BASEROUTE = this.props.location.pathname;
      this.props.history.push("/login");
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
          <Route exact path="/resetPassword" component={PasswordReset} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/curriculum" component={Curriculum} />
          <PrivateRoute path="/createevent" component={CreateEvent} />
          <PrivateRoute path="/carousel" component={Carousel} exact />
          <PrivateRoute path="/category" component={Category} exact />
          <PrivateRoute path="/student" component={Student} exact />
          <Redirect to="/login" />
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
  console.log("app state", state);
  const loginResponse = JSON.parse(localStorage.getItem("user"));
  console.log(loginResponse);
  return { auth: true, spinnerStatus: state.spinnerStatus.spinnerStatus,
    modalState: state.openModal };
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

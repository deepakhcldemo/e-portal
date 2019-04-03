import React, { Component } from 'react';
import ReduxToastr from "react-redux-toastr";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthGuard from "./authguard/AuthGuard";
import { withRouter } from "react-router";
import GLOBAL_VARIABLES from "./config/config";
import './App.css';
import Classes from './views/Classes';
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Curriculum from "./views/Curriculum";
import Profile from "./views/Profile";

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

  render() {
    return (
      // <div className="App">
      
      // <button onClick = {this.props.openModal}> open Class</button>
      
      // <ClassComponent></ClassComponent>
      // </div>
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
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/classes" component={Classes} />
          <PrivateRoute path="/curriculum" component={Curriculum} />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      modalState : state.openModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    openModal : () => dispatch({type : 'open'})
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(App);

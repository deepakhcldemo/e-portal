import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import axios from "axios";
import "./styles.css";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import GLOBAL_VARIABLES from "../../config/Config";
import * as actionTypes from "../../spinnerStore/actions";
class Curriculum extends Component {
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Header headeTitle="Curriculum" />
          </div>
        </div>
      </div>
    );
}
}
const mapStateToProps = state => {
  return {
    // loggedInStatus: state.login.loggedInStatus
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Curriculum);

import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import Classes from '../Classes/index'
import { connect } from 'react-redux';
class Dashboard extends Component {
  createClass = () => {
    this.props.createClassDispatch()
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Header headeTitle="Dashboard" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 content-container">
          <button className ="btn btn-primary" onClick ={this.createClass}>Create Class</button>
          <Classes></Classes>
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    createClassDispatch: () => dispatch({ type: 'open' })
  };
};

export default connect(
  null,
  mapDispatchToProps
) (Dashboard);

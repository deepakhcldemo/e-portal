import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import { connect } from 'react-redux';
import { resolve } from "q";
class Dashboard extends Component {
  state = {
    classessName: []
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
          <div className="col-3">
            <button className="btn btn-primary" onClick={this.createEvent}>Create Event</button>
          </div>
          <div className="col-9">
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    modalSata: state.classes
  };
};

const mapDispatchToProps = dispatch => {
  return {
      };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import { connect } from 'react-redux';
import { resolve } from "q";
import Carousel from '../../components/carousel/Carousel';

class Dashboard extends Component {
  state = {
    classessName: []
  }
  
 createEvent = () => {
    this.props.history.push('/createevent');
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
            <div className="col-12 content-container">
              <button onClick ={this.createClass}>Create Class ...</button>
              <Classes></Classes>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 content-container">
            <Carousel />
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

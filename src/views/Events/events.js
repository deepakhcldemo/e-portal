import React, { Component } from "react"
import { connect } from 'react-redux';
import "./eventstyle.css"
import { EVENT_CONSTANT } from '../../constant/Event-Constant'

class Event extends Component {

  render() {
    return (
      <div className ="wrapper">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <h1>Create Event</h1>
          <div className="form-group">
            <label>Event Name:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Event Description:</label>
            <textarea rows="4" cols="50" className ="form-control"></textarea>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
};
const mapDispatchToProps = dispatch => {

};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);


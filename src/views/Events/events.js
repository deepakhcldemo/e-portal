import React, { Component } from "react"
import { connect } from 'react-redux';
import "./eventstyle.css"
import { EVENT_CONSTANT } from '../../constant/Event-Constant'
import ModalPopUp from '../../shared/components/modalpopup/modalpopup'
import Calendar from 'react-calendar';
import { openModalPopUp} from './eventAction';
class CreateEvent extends Component {
  state = {
    currentDate: new Date(),
    hideStartCalender: false,
    hideEndCalender: false
  }

  onChangeDate = date => {
    console.log('date', date);
  }


  toggleStartCalender = () => {
    const startDateToggle = this.state.hideStartCalender;
    this.setState({
      hideStartCalender: !startDateToggle
    })
  }

  toggleEndCalender = () => {
    const startDateToggle = this.state.hideStartCalender;
    this.setState({
      hideStartCalender: !startDateToggle
    })
  }


  toggleEndCalender = () => {
    const startDateToggle = this.state.hideEndCalender;
    this.setState({
      hideEndCalender: !startDateToggle
    })
  }


  goBackToDashboard = () => {
    this.props.history.goBack();
  }

  openModal = () => {
    this.props.openModalPopUp();
  }
  render() {
    return (
      
      <div className="wrapper">
      <ModalPopUp></ModalPopUp>
        <div className="row">
        <div className ="back-to-dashborad" onClick = {this.goBackToDashboard}><i className="fa fa-angle-left left-arrow-icon"></i><span>Back To Dashboard</span></div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <h1>Create Event</h1>
            <div className="form-group">
              <label>Event Name:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Event Description:</label>
              <textarea rows="4" cols="50" className="form-control"></textarea>
            </div>
            <div className="input-container">
              <label className="calender-label">Students :</label>
              <input type="text" className="form-control" /> <i className="fa fa-search search-icon" aria-hidden="true" onClick ={this.openModal}></i>
            </div>
            <div className="form-group start-end-date">
              <div className="row">
                <div className="col-4 col-sm-12 col-md-4 col-lg-4">

                  <div className="input-container">
                    <label className="calender-label">Start Date :</label>
                    <input type="text" className="input-field" /> <i className="fa fa-calendar calender-icon" aria-hidden="true" onClick={this.toggleStartCalender}></i>
                  </div>
                  <div className="complete-calender">
                    {this.state.hideStartCalender ?
                      <Calendar
                        value={this.state.currentDate}
                        onChange={this.onChangeDate}

                      /> : null}
                  </div>
                </div>
                <div className="col-4 col-sm-12 col-md-4 col-lg-4">

                  <div className="input-container">
                    <label className="calender-label">End Date :</label>
                    <input type="text" className="input-field" /> <i className="fa fa-calendar calender-icon" aria-hidden="true" onClick={this.toggleEndCalender}></i>
                  </div>
                  {this.state.hideEndCalender ?
                    <Calendar
                      value={this.state.currentDate}
                      onChange={this.onChangeDate}
                    /> : null}
                </div>
                <div className="form-group">
                  <label className="margin-both">All Day Event </label>
                  <input type="checkbox" name="checkbox" value="value" />
                </div>
                <div className="form-group margin-top-bottom">
                  <input type="button" className="btn btn-success margin-both " value="Create Event" />
                  <input type="button" className="btn btn-danger" value="Cancel" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    openModalPopUp: () => dispatch(openModalPopUp())
  }
};

export default connect(null, mapDispatchToProps)(CreateEvent);
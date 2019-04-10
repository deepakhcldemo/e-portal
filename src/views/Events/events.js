import React, { Component } from "react"
import { connect } from 'react-redux';
import "./eventstyle.css"
import { EVENT_CONSTANT } from '../../constant/Event-Constant'
import ModalPopUp from '../../shared/components/modalpopup/modalpopup';
import DateTimePicker from 'react-datetime-picker';

import { openModalPopUp, getStudentList, addStudent } from './eventAction';
// import TimePicker from 'react-bootstrap-time-picker';
class CreateEvent extends Component {
  state = {
    customEndDate: new Date(),
    customStartDate: new Date(),
    hideStartCalender: false,
    hideEndCalender: false,
    endDateCalender: false,
    taggedStudentsNames: [],
    startDate: new Date(),
    endDate: (new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()),
  }
  componentDidMount() {
    this.props.getStudentList();

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
  allDayEvent = (event) => {
    if (event.target.checked) {
      this.setState({
        endDateCalender: true
      })
    }
    else {
      this.setState({
        endDateCalender: false
      })
    }

  }

  goBackToDashboard = () => {
    this.props.history.goBack();
  }

  openModal = () => {
    this.props.openModalPopUp();
  }

  onChangeStartDate = (date) => {
    const startDateToggle = this.state.hideStartCalender;
    this.setState({
      hideStartCalender: !startDateToggle
    })
  }

  onChangeEndDate = () => {
    const startDateToggle = this.state.hideEndCalender;
    this.setState({
      hideEndCalender: !startDateToggle
    })
  }
  onSaveStudentsList = (studentList) => {
    console.log('studentList', studentList);
  }

  onStartDateChange = (startdate) => {
    this.setState({
      customStartDate: startdate
    })
  }
  getStudentList = (studentList) => {
    this.setState({
      taggedStudentsNames: studentList
    })
  }

  onEndDateChange = (Enddate) => {
    this.setState({
      customEndDate: Enddate
    })
  }
  render() {
    let style = {}
    this.state.endDateCalender ? style = { 'display': 'none' } : style = {}
    return (

      <div className="wrapper">
        <ModalPopUp onSaveStudentsList={this.getStudentList} taggedStudentFromEvent = {this.state.taggedStudentsNames} ></ModalPopUp>
        <div className="row">
          <div className="back-to-dashborad" onClick={this.goBackToDashboard}><i className="fa fa-angle-left left-arrow-icon"></i><span>Back To Dashboard</span></div>
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
              <input type="text" className="form-control" disabled={true} value={this.state.taggedStudentsNames} /> <i className="fa fa-search search-icon" aria-hidden="true" onClick={this.openModal}></i>
            </div>
            <div className="form-group start-end-date">
              <div className="row">
                <div className="col-6 col-sm-12 col-md-6 col-lg-6">

                  <div className="input-container">
                    <label className="calender-label">Start Date :</label>
                    <DateTimePicker
                      value={this.state.customStartDate}
                      onChange={this.onStartDateChange}
                    />
                  </div>
                  <div className="complete-calender">

                  </div>
                </div>
                <div className="col-6 col-sm-12 col-md-6 col-lg-6" disabled={this.state.endDateCalender}>

                  <div className="input-container" style={style}>
                    <label className="calender-label">End Date :</label>
                    <DateTimePicker
                      value={this.state.customEndDate}
                      onChange={this.onEndDateChange}
                    />
                  </div>

                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 check-box-all-day-event">
                  <label className="margin-both">All Day Event </label>
                  <input type="checkbox" name="checkbox" value="value" onClick={this.allDayEvent} />
                </div>
              </div>
              <div className="form-group margin-top-bottom">
                <input type="button" className="btn btn-primary margin-both " value="Create Event" />
                <input type="button" className="btn btn-secondary" value="Cancel" />
              </div>
            </div>

          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    taggedStudentName: state.event.taggedStudentNames,

  }
}
const mapDispatchToProps = dispatch => {
  return {
    openModalPopUp: () => dispatch(openModalPopUp()),
    getStudentList: () => dispatch(getStudentList())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
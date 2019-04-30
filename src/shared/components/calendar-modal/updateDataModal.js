import React, { Component } from 'react';
//import { connect } from "react-redux"
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';
import Select from 'react-select';
import Joi from 'joi-browser';
import Input from './helper/input';
import TextArea from './helper/textArea';
import SelectCustom from './helper/select';
//import { getNotification } from './calendarAction';

import {
  saveChatNotificationDetails,
  udpateChatNotificationDetails
} from '../../../database/dal/firebase/chatNotificationDal';
import './calendar.css';

class CalendarModal extends Component {
  state = {
    data: { datetime: '', duration: '', message: '' },
    errors: {}
  };

  schema = {
    datetime: Joi.string()
      .required()
      .label('Date Time'),
    duration: Joi.string()
      .required()
      .label('Duration'),
    message: Joi.string()
      .required()
      .label('Message')
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    console.log('Name: ', name);
    console.log('Value: ', value);
    // const obj = { [name]: value };
    // const schema = { [name]: this.schema[name] };
    // const { error } = Joi.validate(obj, schema);
    // return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const { data } = this.state;

    const createdAt = new Date();
    const loggedInUSer = JSON.parse(localStorage.getItem('user'));
    if (loggedInUSer) {
      const chatNotificationDetails = {
        nId: this.props.notificationId,
        scheduleDate: data.datetime,
        duration: data.duration,
        status: -1,
        reqForReSchedule: true,
        reschedule: false,
        comment: [
          {
            by: loggedInUSer.user.uid,
            date: createdAt,
            details: data.message
          }
        ]
      };
      udpateChatNotificationDetails({
        ...chatNotificationDetails
      });
    }
    this.props.closeCalendarModal();
    //console.log(data)
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    console.log('Handle Change');

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ [input.name]: input.value, errors });
  };

  constructor(props) {
    super(props);
  }

  onCloseModal = () => {
    this.props.closeCalendarModal();
  };

  render() {
    const options = [
      { value: '-1', label: 'Select' },
      { value: '15m', label: '15 Minuts' },
      { value: '30m', label: '30 Minuts' },
      { value: '1h', label: '1 Hours' }
    ];

    const chatStatus = [
      { value: '-1', label: 'Pending' },
      { value: '1', label: 'Approved' },
      { value: '0', label: 'Rejected' }
    ];

    const openModal = this.props.modalState;
    return (
      <div>
        <Modal
          open={openModal}
          onClose={this.onCloseModal}
          classNames={{ modal: this.props.classes }}
        >
          <form onSubmit={this.handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                />
                <h4 className="modal-title" id="myModalLabel">
                  Discuss on Time with NotifyId:{this.props.notificationId}
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 ">Pick Date and Time</div>
                  <div className="col-md-6">Select a duration2</div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Datetime
                      value={this.state.datetime}
                      onChange={this.handleChange}
                      inputProps={{
                        placeholder: 'Please choose date and time',
                        name: 'datetime'
                      }}
                    />
                    <div className="c-error">{this.state.errors.datetime}</div>
                    {/* <Input
                      value={this.state.datetime}
                      onChangeHandle={this.handleChange}
                      name="datetime"
                      className="form-control"
                      errorMessage={this.state.errors.datetime}
                      placeHolder="04/20/2019 12:00 AM"
                    /> */}
                  </div>

                  <div className="col-md-6">
                    <SelectCustom
                      value={this.state.duration}
                      onChangeHandle={this.handleChange}
                      name="duration"
                      className="form-control"
                      errorMessage={this.state.errors.duration}
                      placeHolder="Duration"
                    />
                    {/* <Input
                      value={this.state.duration}
                      onChangeHandle={this.handleChange}
                      name="duration"
                      className="form-control"
                      errorMessage={this.state.errors.duration}
                      placeHolder="Duration"
                    /> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">Message</div>
                  <div className="col-md-12">
                    <TextArea
                      value={this.state.message}
                      onChangeHandle={this.handleChange}
                      name="message"
                      className="form-control"
                      errorMessage={this.state.errors.message}
                      placeHolder="Message"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  data-dismiss="modal"
                >
                  Request
                </button>

                <input
                  onClick={this.onCloseModal}
                  type="button"
                  className="btn btn-success"
                  value="Cancel"
                />
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default CalendarModal;

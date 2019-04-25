import React, { Component } from 'react';
//import { connect } from "react-redux"
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';
import Select from 'react-select';
import Joi from "joi-browser"
import Input from "./helper/input";
import TextArea from "./helper/textArea";
//import { getNotification } from './calendarAction';
import { saveChatNotificationDetails } from '../../../database/dal/firebase/chatNotificationDal';



class CalendarModal extends Component {

  state = {
    data: { datetime: "", duration: "", message: "" },
    errors: {}
  };

  schema = {
    datetime: Joi.string()
      .required()
      .label("Date Time"),
    duration: Joi.string()
      .required()
      .label("Duration"),
    message: Joi.string()
      .required()
      .label("Message")
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
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  handleSubmit = e => {
    const randomString = this.randomString(20)
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const { data } = this.state;

    const createdAt = new Date();
    const loggedInUSer = JSON.parse(localStorage.getItem('user'));
    if (loggedInUSer) {
      const chatNotificationDetails = {
        nId: randomString,
        charge: "3$",
        createdAt,
        details: data.message,
        paymentStatus: false,
        reschedule: true,
        sId: loggedInUSer.user.uid,
        sStatus: true,
        tId: this.props.teacherData.userId,
        tStatus: true,
        status: -1,
        reqForReSchedule: false,
        reschedule: false,
        comment: [{
          "by": loggedInUSer.user.uid,
          "date": createdAt,
          "details": data.message
        }

        ],
        scheduleDate: data.datetime,
        duration: data.duration
      }
      saveChatNotificationDetails({
        ...chatNotificationDetails
      })
      //this.props.history.push('/dashboard');
      //model close display message success or failure
    }

    //console.log(data)
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  constructor(props) {
    super(props);
  }

  onCloseModal = () => {
    this.props.closeCalendarModal();
  };


  // handleChange = e => {
  //   const { name, value } = e.target;
  //   console.log(value)
  //   this.setState({ [name]: value });
  // };firstName


  render() {
    //console.log("RANDOM GENERATE STRING => ", this.randomString(20));
    const { userId: teacherId, firstName, lastName } = this.props.teacherData;
    console.log("get All Notification => ", this.props.notificationDetails)
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
        <Modal open={openModal} onClose={this.onCloseModal} classNames={{ modal: this.props.classes }}>
          <form onSubmit={this.handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 className="modal-title" id="myModalLabel">Send Chat Notification to {firstName} {lastName} </h4>
              </div>
              <div className="modal-body">



                <div className="row">
                  <div className="col-md-6 ">
                    Pick Date and Time
</div>
                  <div className="col-md-6">
                    Select a duration
</div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {/* <Datetime /> */}
                    <Input
                      value={this.state.datetime}
                      onChangeHandle={this.handleChange}
                      name="datetime"
                      className="form-control"
                      errorMessage={this.state.errors.datetime}
                      placeHolder="04/20/2019 12:00 AM"
                    />
                  </div>
                  <div className="col-md-6">
                    {/* <Select
      className="form-control"
      onChange={this.handleChange}
      options={options}
    /> */}
                    {/* <select className="form-control" onChange={this.handleChange} name="duration">
      <option value={-1}>Select</option>
      <option value={"15m"}> 15 minutes</option>
      <option value={"30m"}> 30 minutes</option>
      <option value={"1h"}> 1 hour</option>
      <option value={"2h"}> 2 hours</option>
    </select> */}

                    <Input
                      value={this.state.duration}
                      onChangeHandle={this.handleChange}
                      name="duration"
                      className="form-control"
                      errorMessage={this.state.errors.duration}
                      placeHolder="Duration"
                    />
                  </div>
                </div>
                <div className="row">


                  <div className="col-md-12">
                    Message
</div>
                  <div className="col-md-12">
                    <TextArea
                      value={this.state.message}
                      onChangeHandle={this.handleChange}
                      name="message"
                      className="form-control"
                      errorMessage={this.state.errors.message}
                      placeHolder="Message" />

                  </div>



                </div>




              </div>
              <div className="modal-footer">

                <button type="submit" className="btn btn-success" data-dismiss="modal">Request</button>

                <input onClick={this.onCloseModal} type="button" className="btn btn-success" value="Cancel" />

              </div>
            </div>







          </form>
        </Modal>
      </div >
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     notificationDetails: state.notificationReducer.notificationDetails,

//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     getNotification: () => dispatch(getNotification()),
//   }
// }
//export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal);

export default CalendarModal;
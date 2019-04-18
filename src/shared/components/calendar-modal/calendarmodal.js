import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';

class CalendarModal extends Component {
  constructor(props) {
    super(props);
  }

  onCloseModal = () => {
    this.props.closeCalendarModal();
  };
  requestChat = () => {
    this.onCloseModal();
    // Add code her to initiate the chat with teacher mechanism
  }


  render() {
    const openModal = this.props.modalState;
    return (
      <div>
        <Modal open={openModal} onClose={this.onCloseModal} classNames={{ modal: this.props.classes }}>
          <div className="header" />
          <div className="body">
            <div className="row">
              <div className="col-md-6">
                Pick Date and Time
              </div>
              <div className="col-md-6">
                Select a duration
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Datetime />
              </div>
              <div className="col-md-6">
                <select>
                  <option value={-1}>Select</option>
                  <option value={"15min"}> 15 minutes</option>
                  <option value={"30min"}> 30 minutes</option>
                  <option value={"1hr"}> 1 hour</option>
                  <option value={"2hr"}> 2 hours</option>
                </select>
              </div>
            </div>

          </div>
          <div className="footer">
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center">
                <input onClick={this.requestChat} type="button" className="btn btn-success" value="Request" />
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <input onClick={this.onCloseModal} type="button" className="btn btn-success" value="Cancel" />
              </div>
            </div>
          </div>
        </Modal>
      </div >
    );
  }
}
export default CalendarModal;

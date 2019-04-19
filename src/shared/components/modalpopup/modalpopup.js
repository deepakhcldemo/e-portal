import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import {
  closeModalPopUp,
  saveStudent,
  addStudentNames,
  addStudent
} from './modalAction';

class ModalPopUp extends Component {
  constructor(props) {
    super(props);
  }

  onCloseModal = () => {
    this.props.closePopModal();
  };

  render() {
    const openModal = this.props.modalState;
    debugger
    return (
      <div>
        <Modal open={openModal} onClose={this.onCloseModal} center />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalState: state.teacherDetailsReducer.requestForReviewPop
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopModal: () => dispatch(closeModalPopUp())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPopUp);

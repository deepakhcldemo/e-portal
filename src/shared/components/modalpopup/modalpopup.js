import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { connect } from "react-redux"
import {closeModalPopUp} from './modalAction';
 
 class ModalPopUp extends Component {

  constructor(props){
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  onCloseModal = () => {
    this.props.closePopModal();
  }
  render() {
    debugger
    const studentList = this.props.studentList.map((student) => {
      return(
          <tr>
            <td>{student.fname}</td>
            <td>{student.lname}</td>
            <td><input type="checkbox"></input></td>
          </tr>
      )
  });
    console.log('this.props.student', this.props);
    const openModal = this.props.modalState
    return (
      <div>
       
        <Modal open={openModal} onClose={this.onCloseModal} center>
            <h2>Student List</h2>
            <table class="table">
              <thead>
                <tr>
                  <td>First Name</td>
                  <td>Last Name</td>
                  <td>Action</td>
                </tr>
              </thead>
                {studentList}
            </table>
            <div>
              <input type="button" className ="btn btn-success" value ="Save Student"></input>
              <input type="button" className ="btn btn-danger" value ="Cancel"></input>
            </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalState: state.event.openModalForStudent,
    studentList : state.event.students 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopModal: () => dispatch(closeModalPopUp())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ModalPopUp)
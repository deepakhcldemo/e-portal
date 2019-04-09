import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { connect } from "react-redux"
import { closeModalPopUp, saveStudent, addStudent } from './modalAction';


class ModalPopUp extends Component {

  constructor(props) {
    super(props);
    this.tempStudent = [];
    this.state = {
      taggedStudent: []
    }
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  onCloseModal = () => {
    this.props.closePopModal();
  }
  actionOnList = (event, student) => {
    console.log(event.target.checked, student, 'event');
    if (event.target.checked) {
      this.tempStudent.push(student.fname);
    }
    else {
      const index = this.tempStudent.indexOf(student.fname);
      this.tempStudent.splice(index, 1);
    }
   
  }
  SaveSelectedStudent = () => {
    this.props.taggedStudent(this.tempStudent);
  }
  render() {
    const studentList = this.props.studentList.map((student) => {
      return (
        <tr>
          <td>{student.fname}</td>
          <td>{student.lname}</td>
          <td><input type="checkbox" onChange={(event) => this.actionOnList(event, student)}></input></td>
        </tr>
      )
    });
    const openModal = this.props.modalState
    return (
      <div>

        <Modal open={openModal} onClose={this.onCloseModal} center>
          <h2>Student List</h2>
          <table className="table">
            <thead>
              <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {studentList}
            </tbody>
          </table>
          <div>
            <input type="button" className="btn btn-primary" value="Save Selected Student" onClick={this.SaveSelectedStudent}></input>

          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalState: state.event.openModalForStudent,
    studentList: state.event.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopModal: () => dispatch(closeModalPopUp()),
    saveStudent: () => dispatch(saveStudent()),
    taggedStudent : (students) => dispatch(addStudent(students))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPopUp)
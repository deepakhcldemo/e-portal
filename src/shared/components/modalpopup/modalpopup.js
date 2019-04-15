import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { connect } from "react-redux"
import { closeModalPopUp, saveStudent, addStudentNames, addStudent } from './modalAction';


class ModalPopUp extends Component {

  constructor(props) {
    //this.maintainStudents = [];
    super(props);
    this.studentNames = [];
    this.students = [];
    this.state = {
      taggedStudent: [],
      updatingUI: false,
      checkBoxMessage : ''

    }
    this.SaveSelectedStudent = this.SaveSelectedStudent.bind(this);
  }


  onCloseModal = () => {
    debugger
    this.props.closePopModal();
  }

  componentDidUpdate() {
    this.studentNames = [];
    this.props.studentList.forEach((student) => {
      student.tagged = false;
    })
  }
  actionOnList = (event, getstudent) => {
    const Index = this.props.studentList.indexOf(getstudent);
    
    if (event.target.checked) {
      this.props.studentList[Index].checked = true;
    }
    else{
      this.props.studentList[Index].checked = false;
    }

    this.setState({
      updatingUI : true
    })
   
  }
  SaveSelectedStudent = () => {
    this.props.studentList.forEach((student) => {
      if (student.checked) {
        this.studentNames.push(student.fname);
        this.students.push(student);
      }
    })
    if(this.studentNames.length !=0 && this.students.length !=0){
      this.setState({
        checkBoxMessage : ''
      })
    this.props.taggedStudentNames(this.studentNames);
    this.props.taggedStudent(this.students);
    this.props.onSaveStudentsList(this.studentNames);
    this.props.closePopModal();
    }
    else{
      this.setState({
        checkBoxMessage : 'please select at least one student'
      })
    }
  }
  render() {
    const studentList = this.props.studentList.map((student) => {

      return (
        <tr>
          <td>{student.fname}</td>
          <td>{student.lname}</td>
          <td><input type="checkbox" onChange={(event) => this.actionOnList(event, student)} checked={student.checked}></input></td>
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
          <p>{this.state.checkBoxMessage}</p>
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
    studentList: state.event.students,
    taggedStudentFromEvent: state.event.taggedStudent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopModal: () => dispatch(closeModalPopUp()),
    saveStudent: () => dispatch(saveStudent()),
    taggedStudentNames: (studentsNames) => dispatch(addStudentNames(studentsNames)),
    taggedStudent: (students) => dispatch(addStudent(students))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPopUp)
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Header from "../../components/layout/header/Header";
import { connect } from 'react-redux';
import classess from './styles.module.css';

import firebase from '../../database/firebasedb';


class Classes extends Component {
  state = {
    student: [],
    classess: []
  };


  componentDidMount() {
    let tempData = [];
    const ePortalDatabase = firebase.firestore();
    ePortalDatabase.collection('users').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {

        // this.setState({
        //   Student: tempData
        // })
        tempData.push(doc.data());
      })

      this.setState({
        student: tempData
      })
    });

  }
  getClassName = (event) => {
    const ePortalDatabase = firebase.firestore();
    const classCollection = ePortalDatabase.collection("class");
    classCollection.get()

  }
  selectUnselectStudent = (event, student) => {
    if (event.target.checked) {
      student.tagged = true;
    }
    else {
      student.tagged = false;
    }


  }
  saveClass = (event) => {
    const taggedStudent = [];
    event.preventDefault();
    this.state.student.forEach((student) => {
      if (student.tagged) {
        taggedStudent.push(student);
      }
    })

    // console.log('taggedStudent',taggedStudent);
    // const ePortalDatabase = firebase.firestore();
    // ePortalDatabase.collection('class').doc("").set({
    //   students : taggedStudent
    // });

  }


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const checkBoxStyle = {
      borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#c3c4c6',
        borderRadius: '4px',
        checkColor: '#60cd18',
        height: '30px'
    }
    let studentList = [];
    studentList = this.state.student.map((student) => {
      return (
        <tr key={student.id}>
          <td>{student.fname}</td>
          <td>{student.lname}</td>
          <td><input type="checkbox" onChange={(event) => this.selectUnselectStudent(event, student)} style = {checkBoxStyle}/></td>
        </tr>
      );
    });
    const { modalState } = this.props;
    return (
      <div className="container">

        <Modal open={modalState} onClose={this.props.closeModal} center>

          {studentList !== null ? <form>
            <h2 className={classess.changeColor} >Create Class</h2>

            <div className ={classess.classTextBox}>
              <label htmlFor="classTxt"  className = {classess.classText}>Class Name:</label>
              <input type="text" id="classTxt" className="form-control" className={classess.classTextBox} onChange={this.getClassName} autoComplete="off"/>
            </div>
            <table  className="table table-striped">
              <thead>
                <tr><td>First Name</td>
                  <td>Last Name</td>
                </tr>

              </thead>
              <tbody>
                {studentList}
              </tbody>
            </table>


            <input type="submit" value="Save Class" onClick={this.saveClass} className={"btn btn-primary" + ' '+ classess.btnMargin} />
            <input type="button" value="Cancel" onClick={this.props.closeModal} className="btn btn-danger" />
          </form> : null}
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    modalState: state.classes.openModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: 'close' })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Classes);
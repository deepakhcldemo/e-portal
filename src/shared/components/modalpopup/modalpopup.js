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
import './modalpopup.css';
class ModalPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentName: ''
    }
  }

  onCloseModal = () => {
    this.props.closePopModal();
  };
  componentDidMount() {
    const studentDetails = JSON.parse(localStorage.getItem('userProfile'));
    this.setState({
      studentName: studentDetails.firstName + ' ' + studentDetails.lastName
    })
  }
  render() {
    const openModal = this.props.modalState;

    return (
      <div>

        <Modal open={openModal} onClose={this.onCloseModal} center>
          <div className="header">
            <h2>Create Notification</h2>
          </div>
          <div className="body">
            <form>
              <div className="form-group">
                <div className="teacher-student">
                  Student Name : {this.state.studentName}
                </div>
                <div>
                  <textarea rows="4" cols="50" className="form-control" placeholder="Please add details here">

                  </textarea>

                  <div class="file btn btn-primary">
                    Upload
                    </div>
                  <input accept ="video/*" type="file" name="file" />


                </div>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </Modal>

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

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import {
  closeModalPopUp

} from './modalAction';
import './modalpopup.css';
class ModalPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentName: '',
      teacherName : ''
    }
    
  }

  onCloseModal = () => {
    this.props.closePopModal();
  };
  componentDidMount() {
    console.log('this.props in', this.props.teacherDeatils);
    const studentDetails = JSON.parse(localStorage.getItem('userProfile'));
    if (studentDetails) {
      this.setState({
        studentName: studentDetails.firstName + ' ' + studentDetails.lastName
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    this.setState({
      teacherName : nextProps.teacherDeatils.title
    })

  }
  render() {
    const openModal = this.props.modalState;
    const teacherDetails = this.props.title;
    console.log('teacherDetails', teacherDetails);
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
                <div className="btn btn-sm btn-info">Student: {this.state.studentName}</div>
                {/* <div className ="student-teacher-notifying"><b><i className="fa fa-angle-right">Notifying to </i></b></div> */}
                <div className="btn btn-sm btn-info teacher">Teacher: {this.state.teacherName}</div>
                </div>
                <div>
                  <textarea rows="4" cols="50" className="form-control" placeholder="Please add details here">
                  </textarea> <br />
                    <div className="file btn btn-info">  Upload
                    </div> 
                  <input accept ="video/*" type="file" name="file" className="fileOne" />
                  
                </div>
              </div>
              <button type="submit" className="btn btn-dark submit">Create</button>
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

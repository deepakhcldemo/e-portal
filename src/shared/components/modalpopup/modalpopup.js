import React, { Component } from 'react';
import { saveNotification, getVideoUrl } from '../../../database/dal/firebase/notificationdal';
import ReactDOM from 'react-dom';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import {
  closeModalPopUp

} from './modalAction';
import './modalpopup.css';
import FirebaseStorage from 'firebase';
class ModalPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentName: '',
      teacherName: '',
      notificationDescription : ''
    }
    this.createNotification = this.createNotification.bind(this);
    this.notoficationDescription= this.notoficationDescription.bind(this);
  }

  onCloseModal = () => {
    this.props.closePopModal();
  };
  componentDidMount() {
    const studentDetails = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null;
    if (studentDetails) {
      this.setState({
        studentName: studentDetails.firstName + ' ' + studentDetails.lastName,
        userDetails: studentDetails
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps in teacher', nextProps)
    this.setState({
      teacherName: nextProps.teacherDeatils.title,
      tid : nextProps.teacherDeatils.title.id
    })

  }


  handleVideoUploadSuccess = fileName => {
    console.log(fileName);
  };

  

  notoficationDescription = (event) => {
    
    this.setState({
      notificationDescription : event.target.value
    })
  }


  createNotification = () => {
    const loggedInUSerDetails = JSON.parse(localStorage.getItem('userProfile'));
    let tId , sId;
    if(loggedInUSerDetails.role === 'Teacher'){
      tId  = loggedInUSerDetails.userId;
      sId = '';
    }
    else{
      sId  = loggedInUSerDetails.userId;
      tId = ''
    }
    const notificationDetails = {
        notificationDesc : this.state.notificationDescription,
        tId, 
        sId,
        loggedInUserId : loggedInUSerDetails.userId

    }
    getVideoUrl().then(url => {
      let sVideo = '',  tVideo = '';
      loggedInUSerDetails.role === 'Teacher' ? tVideo = url : sVideo = url;
      notificationDetails.tvideo = tVideo;
      notificationDetails.status = false;
      notificationDetails.sVideo = sVideo;
      notificationDetails.comments = [];
      saveNotification(notificationDetails);
      this.onCloseModal();
    })

  }
  render() {
    const studentDetails = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null;
    const { userDetails } = this.props
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
                  <textarea rows="4" cols="50" className="form-control" placeholder="Please add details here" onChange = {this.notoficationDescription}>
                  </textarea> <br />
                  <div className="file btn btn-info">  Upload
                    <FileUploader

                      accept='video/*'
                      storageRef={firebase.storage().ref("notification" + "/" + studentDetails.userId)}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleVideoUploadSuccess}
                      onProgress={this.handleProgress}
                    />
                  </div>


                </div>
              </div>
              <button type="button" className="btn btn-dark submit" onClick={this.createNotification}>Create</button>
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

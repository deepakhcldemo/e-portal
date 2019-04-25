import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { getVideoUrl, saveNotificationAccepted } from '../../../database/dal/firebase/notificationdal';
import firebase from 'firebase';
import { withRouter } from 'react-router';
import Modal from 'react-responsive-modal';
import { closePopModalForNotification, saveAcceptedNotification } from './actions';
import { connect } from 'react-redux';
import './index.css';
// import { closeModalPopUp } from './modalAction';
// import './modalpopup.css';
class ModalPopUpForNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentName: '',
            teacherName: '',
            notificationDescription: '',
            validationMessage: '',
            notificationPermission: true,
            videoName: '',
            isUploading: false
        }

        this.uploadAndAccept = this.uploadAndAccept.bind(this);
    }

    onCloseModal = () => {
        this.props.closePopModalForNotification();
    };
    componentDidMount() {
        this.setState({
            notificationDetails: this.props.notificationDetails
        })
    }

    componentWillReceiveProps(nextProps) {
        const notificationDetails = nextProps
    }
    handleUploadStart = () => this.setState({ isUploading: true });

    handleVideoUploadSuccess = fileName => {
        this.setState({
            isUploading: false,
            videoName: fileName
        })
    };


    uploadAndAccept = () => {
        const self = this;
        const acceptNotification = { ...this.props.notificationDetails };
        acceptNotification.tstatus = true;
        acceptNotification.sstatus = true;

        getVideoUrl(this.state.videoName).then(url => {

            if (url !== "" && this.props.notificationDetails.notificationDesc !== '') {
                acceptNotification.tvideo = url
                self.setState({
                    validationMessage: ''
                })
                self.props.saveAcceptedNotification(acceptNotification);
                self.onCloseModal();
            }
            else {
                self.setState({
                    validationMessage: 'Description or Video can not be empty'
                })
            }

        })
       // this.props.history.go('/notification');
    }




        render() {
        const open = this.props.modalState;
        return (
            <Modal open={open} onClose={this.onCloseModal} center>
                <div className="video-upload-center">
                    <FileUploader
                        accept='video/*'
                        className="upload-video"
                        storageRef={firebase.storage().ref(`notification/${this.props.notificationDetails.loggedInUserId}`)}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleVideoUploadSuccess}
                        onProgress={this.handleProgress}
                    />
               
                    <button className="btn btn-dark" onClick={this.uploadAndAccept}>Okay</button>
                </div>
            </Modal>


        );
    }
}

const mapStateToProps = state => {
    return {
        modalState: state.notificationAcceptREducer.openModal,
        notificationDetails: state.notificationDetials.notificationDetails
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closePopModalForNotification: () => dispatch(closePopModalForNotification()),
        saveAcceptedNotification: (acceptNotification) => dispatch(saveAcceptedNotification(acceptNotification))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalPopUpForNotification));

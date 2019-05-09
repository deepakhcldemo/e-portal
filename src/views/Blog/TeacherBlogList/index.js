import React, { Component } from 'react';
import * as actionTypes from '../../../spinnerStore/actions';
import './style.css';
import {getImageUrl} from '../../../database/dal/firebase/TeacherBlog';
import Modal from 'react-responsive-modal';
import { openModal, closeModal } from './action'
import HeaderHome from '../../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import {
    getBlogsList
} from './action';
import {
    TEACHER_DASHBOARD_LINKS,
    STUDENT_DASHBOARD_LINKS
} from './../../../constant/Constant';
//import './notificationDetails.css';

class BlogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogTitle: '',
            blogDescription: '',
            blogImage: '',
            userDetails: '',
            validationMessage: '',
            imageName : ''
        };
        this.openModalForBlog = this.openModalForBlog.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setBlogTitle = this.setBlogTitle.bind(this);
        this.setBlogDescription = this.setBlogDescription.bind(this);
        this.saveAsDraft = this.saveAsDraft.bind(this);
         
    }
    setBlogTitle(event) {
        const setTitle = event.target.value;
        this.setState({
            blogTitle: setTitle
        })
    }


    setBlogDescription(event) {
        const setDescription = event.target.value;
        this.setState({
            blogDescription: setDescription
        })
    }


    componentDidMount() {
        this.props.getBlogsList();
        const userDetails = JSON.parse(localStorage.getItem('userProfile'))
        console.log(userDetails);
        this.setState({
            userDetails: userDetails
        })
    }
    openModalForBlog() {
        this.props.openModal()
    }

    closeModal() {
        this.props.closeModal()
    }

    handleImageSuccess

    handleImageSuccess = fileName => {
        this.setState({
          imageName: fileName,
          
        });
      };

    saveAsDraft () {
        getImageUrl(this.state.imageName,
            this.state.userDetails.userId).then((data) => {
                console.log('data',data)
            })  
    }
    render() {
        const { modalState } = this.props

        return (
            <div className="container-fluid">
                <div className="row">
                    <HeaderHome
                        headeTitle="Blog List"
                        dashboardLinks={TEACHER_DASHBOARD_LINKS}
                    />
                </div>
                <div className="row create-article">
                    <div className="col-lg-12 pull-left">

                        <button onClick={this.openModalForBlog}>Create Article</button>
                    </div>
                    <Modal open={modalState} onClose={this.props.closeModal} center>
                        <h2>Create Blog</h2>
                        <span className="red-star">*</span>
                        <input type="text"
                            className="form-control"
                            placeholder="Blog Title"
                            onChange={this.setBlogTitle}
                        />

                        <span className="red-star">*</span>
                        <textarea
                            rows="4"
                            cols="50"
                            className="form-control"
                            placeholder="Blog Description"
                            onChange={this.setBlogDescription}
                        />
                        <div className="col-lg-12 rm-padding">
                            <div className="mr-top">
                                <FileUploader
                                    accept="video/*"
                                    className="upload-video"
                                    storageRef={firebase
                                        .storage()
                                        .ref(`blogs/${this.state.userDetails.userId}`)}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleImageSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <button className="btn btn-outline-primary btn-sm space pull-right" onClick={this.submitBlog}>Submit</button>
                            <button className="btn btn-outline-primary btn-sm space pull-right" onClick={this.saveAsDraft} onclick >Save As Draft</button>

                        </div>
                    </Modal>
                </div>
            </div>



        );
    }
}
const mapStateToProps = state => {
    return {
        notificationDetails:
            state.notificationAcceptREducer.notificationDetailsByID[0],
        modalState: state.category.openModal,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getBlogsList: () => dispatch(getBlogsList()),
        closeModal: () => dispatch(closeModal()),
        openModal: () => dispatch(openModal())
    }
};

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BlogList)




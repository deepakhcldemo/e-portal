import React, { Component } from 'react';
import * as actionTypes from '../../../spinnerStore/actions';
import './style.css';
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
            blogTitle : '',
            blogDescription : '',
            blogImage : '',
            validationMessage: ''
        };
        this.openModalForBlog = this.openModalForBlog.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setBlogTitle = this.setBlogTitle.bind(this);
        this.setBlogDescription = this.setBlogDescription.bind(this);
    }
    setBlogTitle (event) {
        const setTitle = event.target.value;
        this.setState({
            blogTitle : setTitle
        })
    }


    setBlogDescription (event) {
        const setDescription  = event.target.value;
        this.setState({
            blogDescription : setDescription
        })
    }

    
    componentDidMount() {
        this.props.getBlogsList();
    }
    openModalForBlog() {
        this.props.openModal()
    }

    closeModal() {
        this.props.closeModal()
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
                            onChange = {this.setBlogTitle}
                        />

                        <span className="red-star">*</span>
                        <textarea
                            rows="4"
                            cols="50"
                            className="form-control"
                            placeholder="Blog Description"
                            onChange = {this.setBlogDescription}
                        />
                        <div className="col-lg-12 rm-padding">
                            <div className ="mr-top">
                                <FileUploader
                                    accept="video/*"
                                    className="upload-video"
                                    storageRef={firebase
                                        .storage()
                                        .ref(`blogs/id`)}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleVideoUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </div>
                        </div>
                        <div className="col-lg-12">
                        <button className="btn btn-outline-primary btn-sm space pull-right" onClick={this.closeModal}>Submit</button>
                        <button className="btn btn-outline-primary btn-sm space pull-right" onClick={this.closeModal}>Save As Draft</button>
                        
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




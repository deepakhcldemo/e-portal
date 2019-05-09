import React, { Component } from 'react';
import * as actionTypes from '../../../spinnerStore/actions';
import './style.css';
import Modal from 'react-responsive-modal';
import { openModal, closeModal } from './action'
import HeaderHome from '../../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';

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
            notificationsDetails: [],
            userDetails: {},
            applyClass: 'display-upload',
            isUploading: false,
            videoName: '',
            validationMessage: ''
        };
        this.openModalForBlog = this.openModalForBlog.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
        const {  modalState } = this.props
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
                        <div>Create Modal</div>
                        <button className="btn btn-outline-primary btn-sm space" onClick={this.closeModal}>Cancel</button>
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




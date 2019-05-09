import React, { Component } from 'react';
import * as actionTypes from '../../spinnerStore/actions';
import Navbar from './../../shared/components/Navbar';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';

import {
    getBlogsList
} from './action';
import {
    TEACHER_DASHBOARD_LINKS,
    STUDENT_DASHBOARD_LINKS
} from './../../constant/Constant';
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

    }

    componentDidMount() {
        this.props.getBlogsList();
    }
    render() {
        return (
            <div className="container-fluid">
                <HeaderHome
                    headeTitle="Blog List"
                    dashboardLinks={TEACHER_DASHBOARD_LINKS}
                />
            </div>


        );
    }
}
const mapStateToProps = state => {
    return {
        notificationDetails:
            state.notificationAcceptREducer.notificationDetailsByID[0]
    };
};
const mapDispatchToProps = dispatch => {
  return {
    getBlogsList: () => dispatch(getBlogsList()),
    }
};

 export default 
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BlogList)




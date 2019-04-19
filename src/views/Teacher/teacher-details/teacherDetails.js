import React, { Component } from 'react';
import './teacherDetails.scss';
import { connect } from 'react-redux';
import _ from 'lodash';

import HeaderHome from '../../../components/layout/header/HeaderHome';


class TeacherDetails extends Component {
    state = {
        detailModel: {
            id: '',
            title: 'title',
            description: 'this is demo',
            rating: 7,
            category: '',
            gender: ''
        },
        my:''
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        const data = this.props.detailData[id];
        this.getDetails(data);
    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps', nextProps)
        if (nextProps.detailData !== this.props.detailData) {
            const {id} = nextProps.match.params;
            const data = nextProps.detailData[id];
            this.getDetails(data);
        }
        
    }
    getDetails(data) {
        if (data) {
            const detailModel = {...this.state.detailModel};
            detailModel.id = '00000';
            detailModel.title = data.name;
            detailModel.description = 'This is demo description';
            detailModel.rating = data.rating;
            detailModel.category =  data.category;
            detailModel.gender = data.gender;

            this.setState({detailModel});
       }
    }
    navigateToLogin() {
        const currentId = this.props.match.params.id;
        localStorage.setItem('teacherDetailId', currentId);
        this.props.history.push('/login');

    }
    moreDetails(isLogedIn, detailModel) {
        const {rating, category, gender} = detailModel;
        if (isLogedIn) {
            return (
                <div>
                    More detail to be displayed
                    <ul>
                        <li>Rating: {rating}</li>
                        <li>Category: {category}</li>
                        <li>Gender: {gender}</li>
                    </ul>
                </div>
            )
        }
        return (
            <button className="btn btn-primary" onClick={(e)=> this.navigateToLogin()}>Login to view more</button>
        )
    }
    render() {
        const {title, description} = this.state.detailModel;

        return (
            <div>
                <HeaderHome />
                <div className="container details-wrapper">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="media">
                                <img className="profile-img" src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg" alt="..." />
                                <div className="media-body">
                                    <h5 className="mt-0">{title}</h5>
                                    <p>
                                        {description}
                                    </p>
                                    {this.moreDetails(localStorage.getItem('user'), this.state.detailModel)}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default TeacherDetails;
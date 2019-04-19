import React, { Component } from 'react';
import './teacherDetails.scss';
import { connect } from 'react-redux';
import _ from 'lodash';

import HeaderHome from '../../../components/layout/header/HeaderHome';
import Slider from '../../../components/slider/Slider';


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
        my: ''
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const data = this.props.detailData[id];
        this.getDetails(data);
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        if (nextProps.detailData !== this.props.detailData) {
            const { id } = nextProps.match.params;
            const data = nextProps.detailData[id];
            this.getDetails(data);
        }

    }
    getDetails(data) {
        if (data) {
            const detailModel = { ...this.state.detailModel };
            detailModel.id = '00000';
            detailModel.title = data.name;
            detailModel.description = 'This is demo description';
            detailModel.rating = data.rating;
            detailModel.category = data.category;
            detailModel.gender = data.gender;

            this.setState({ detailModel });
        }
    }
    navigateToLogin() {
        const currentId = this.props.match.params.id;
        localStorage.setItem('teacherDetailId', currentId);
        this.props.history.push('/login');

    }
    moreDetails(isLogedIn, detailModel) {
        const { rating, category, gender } = detailModel;
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
            <button className="btn btn-primary" onClick={(e) => this.navigateToLogin()}>Login to view more</button>
        )
    }
    render() {
        const { title, description } = this.state.detailModel;

        return (
            <div className="details-wrapper">
                <HeaderHome />
                <div className="top-bg">
                    
                    <div className="container">
                        <div className="top-section">
                            <div>
                                <h4>Teacher Name</h4>
                                <span className="sub-title">Credential</span>
                                <span className="sub-title">Subject</span>
                                <span className="sub-title last">Credential</span>
                                <p>
                                    Rating: 3.5
                                    </p>
                            </div>
                            <button className="btn btn-dark">Send Request</button>
                            
                            
                        </div>
                    </div>
                </div>
                <div className="container">
                    
                    
                    <div className="row">
                        <div className="col-sm-12">
                            {/* <h5 className="mt-0">{title}</h5>
                            <p>
                                {description}
                            </p>
                            {this.moreDetails(localStorage.getItem('user'), this.state.detailModel)}
                                */}
                            
                            <div className="row main-setion">
                                <div className="col-sm-3">
                                <img className="profile-img" src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg" alt="..." />
                                </div>
                                <div className="col-sm-9">
                                    <p><strong>Teacher Name</strong> is dolor sit amet long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal. </p>
                                    <p>Color sit amet long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal </p>
                                    <div className="icon-section">
                                        <a href="#"><i className="fas fa-thumbs-up"></i> 12,00</a>
                                        <a href="#"><i className="fas fa-user-circle"></i> 12,00</a>
                                        <a href="#"><i className="fas fa-file"></i> 12,00</a>
                                        <a href="#"><i className="fas fa-video"></i> 12,00</a>
                                    </div>
                                    {!localStorage.getItem('user') && (
                                        <button className="btn btn-primary" onClick={(e) => this.navigateToLogin()}>Login to view more</button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="vd-section">
                                <Slider listTop10Items={['a','b']}>
                                <h4 className="mt-30 pad10">
                                    Online Courses
                                    <i className="fas fa-chevron-right" />
                                </h4>
                                </Slider>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default TeacherDetails;
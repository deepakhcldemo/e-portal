import React, { Component } from 'react';
import './teacherDetails.scss';
import { connect } from 'react-redux';
import _ from 'lodash';
import ModalPopUp from '../../../shared/components/modalpopup/modalpopup'
import { getCurriculumByTeacherId } from '../../../database/dal/firebase/curriculumDal';


import HeaderHome from '../../../components/layout/header/HeaderHome';
import Slider from '../../../components/slider/Slider';
import {openModalForRequest} from './teacher-details.action'

class TeacherDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailModel: {
                id: '',
                title: 'title',
                description: 'this is demo',
                rating: 7,
                gender: ''
            },
            my: ''
        }
        this.openModalForRequest = this.openModalForRequest.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const detailObj = _.filter(this.props.detailData, function(o) { return o.userId === id; });
        this.getDetails(detailObj[0]);

        // getCurriculumByTeacherId('M6mNAMnGQNS7WvQcAOlC84A7Hd52').then(querySnapshot => {
        //     console.log('ssdfsdf')
        //     querySnapshot.forEach(doc => {
        //       const user = doc.data();
        //       console.log('ddss', user)

        //     })
        // });
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        if (nextProps.detailData !== this.props.detailData) {
            const { id } = nextProps.match.params;
            const detailObj = _.filter(nextProps.detailData, function(o) { return o.userId === id; });
            
            this.getDetails(detailObj[0]);
        }

    }
    getDetails(data) {
        console.log('datadata', data)
        if (data) {
            const detailModel = { ...this.state.detailModel };
            detailModel.id = data.userId;
            detailModel.title = data.firstName + ' ' + data.lastName;
            detailModel.description = data.summary;
            detailModel.rating = 5;
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

    openModalForRequest = () => {
        this.props.openModalPopUp();
    }
    render() {
        console.log('this.state.detailModel', this.state.detailModel);
        const { title, description } = this.state.detailModel;
        const isLogedIn = localStorage.getItem('user');
        return (
            <div className="details-wrapper">
                <ModalPopUp/>
                <HeaderHome />
                <div className="top-bg">
                    
                    <div className="container">
                        <div className="top-section">
                            <div>
                                <h4>{title}</h4>
                                <span className="sub-title">Credential</span>
                                <span className="sub-title">Subject</span>
                                <span className="sub-title last">Credential</span>
                                <p>
                                    Rating: 3.5
                                    </p>
                            </div>
                            <button className="btn btn-dark">Send Request</button>
                            <button className="btn btn-dark" onClick ={this.openModalForRequest}>Request For Review</button>
                            
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
                                    <p><strong>{title}</strong> is dolor sit amet long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal. </p>
                                    <p>Color sit amet long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal </p>
                                    <div className="icon-section d-flex">
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-thumbs-up"></i> </button>12,00
                                        </div>
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-user-circle"></i></button> 12,00
                                        </div>
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-file"></i> </button> 12,00
                                        </div>
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-video"></i> </button> 12,00
                                        </div>
                                    </div>
                                    {!isLogedIn && (
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

                            <div className="comments-hdr-section">
                                <div className="author-thumbnail">
                                    img
                                </div>
                                <div className="comments-input">
                                    <input type="text" className="auto-input form-control" placeholder="Add a comment" />
                                </div>
                                <div className="total-comments">
                                    <span className="count">1</span>
                                    <span className="count-text">Comments</span>
                                </div>
                            </div>
                            
                            <div className="comment-thread-element">
                                <div className="author-thumbnail">
                                    img
                                </div>
                                <div className="comment-content">
                                    <span className="date">Comment mm/dd/yyy</span>
                                    <p>
                                        Is dolor sit amet long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.
                                        Color sit amet long established fact that a reader will be distracted by the readable
                                    </p>
                                    <div className="icon-section d-flex">
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-thumbs-up"></i> </button>
                                        </div>
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-thumbs-down"></i></button>
                                        </div>
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-comment-alt"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="comment-thread-element">
                                <div className="author-thumbnail">
                                    img
                                </div>
                                <div className="comment-content">
                                    <span className="date">Comment mm/dd/yyy</span>
                                    <p>
                                        Is dolor sit amet long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.
                                        Color sit amet long established fact that a reader will be distracted by the readable
                                    </p>
                                    <div className="icon-section d-flex">
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-thumbs-up"></i> </button>
                                        </div>
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-thumbs-down"></i></button>
                                        </div>
                                        <div className="icon">
                                            <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-comment-alt"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


// const mapStateToProps = state => {
//     return {
//       modalState: state.teacherDetailsReducer.requestForReviewPop
//     };
//   };
  
  const mapDispatchToProps = dispatch => {
    return {
      openModalPopUp: () => dispatch(openModalForRequest())
    };
  };
  
  export default connect(
    null,
    mapDispatchToProps
  )(TeacherDetails);


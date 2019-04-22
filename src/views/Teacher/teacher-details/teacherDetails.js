import React, { Component } from 'react';
import './teacherDetails.scss';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Spinner } from 'react-bootstrap';

import ModalPopUp from '../../../shared/components/modalpopup/modalpopup'
import HeaderHome from '../../../components/layout/header/HeaderHome';
import Slider from '../../../components/slider/Slider';
import {openModalForRequest} from './teacher-details.action';
import { getTeacherDetailFromDB } from '../../../database/dal/firebase/teacherDetailDal';

class TeacherDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailModel: {
                id: 'Teacher Name',
                title: 'title',
                description: 'this is demo',
                rating: 7,
                category: '',
                gender: ''
            },
            my: '',
            teacherId : '',
            spinner: true
        }
        this.openModalForRequest = this.openModalForRequest.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            this.setState({
                teacherId : this.props.match.params
            })
        }
        

        // const data = this.props.detailData[id];
        // this.getDetails(data);

        getTeacherDetailFromDB(id).then((snapshot)=>{
            console.log('dataaaa--', snapshot);
            snapshot.forEach(doc => {
                const data = doc.data();
                this.setState({spinner: false});
                this.getDetails(data);
                console.log('doc-----', doc.data())
            });
        })    

    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        // if (nextProps.detailData !== this.props.detailData) {
        //     const { id } = nextProps.match.params;
        //     const data = nextProps.detailData[id];
        //     this.getDetails(data);
        // }

    }
    getDetails(data) {
        if (data) {
            const detailModel = { ...this.state.detailModel };
            detailModel.id = data.userId;
            detailModel.title = data.firstName + ' ' + data.lastName;
            detailModel.description = data.summary;
            detailModel.rating = data.rating;
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
        console.log('detailModel in teacher details', detailModel);
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
        const { title, description, rating } = this.state.detailModel;
        const isLogedIn = localStorage.getItem('user');
        return (
            <React.Fragment>
                {this.state.spinner && (
                    <div className="dark-bg">
                        <Spinner animation="border" className="spinner-center" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                )}
                {!this.state.spinner && (
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
                                            Rating: {rating}
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
                                            <p><strong>{title}</strong> {description}</p>
                                            <div className="icon-section d-flex">
                                                <div className="icon">
                                                    <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-thumbs-up"></i> <span>1000</span></button>
                                                </div>
                                                <div className="icon">
                                                    <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-thumbs-down"></i> <span>1000</span></button>
                                                </div>
                                                <div className="icon">
                                                    <button className="btn btn-transparent" disabled={!isLogedIn}><i className="fas fa-comment-alt"></i> <span>1000</span></button>
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
                )}
                
            </React.Fragment>

        )
    }
}


const mapStateToProps = state => {
    console.log('satae in teacher details', state);
    return {
      modalState: state.teacherDetailsReducer.requestForReviewPop
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      openModalPopUp: () => dispatch(openModalForRequest())
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeacherDetails);


import React, { Component } from 'react';
import {connect} from 'react-redux';
import RatingComponent from 'react-star-rating-component';
import { toastr } from 'react-redux-toastr';
import '../Teacher/teacher-details/teacherDetails.scss';
import './BlogDetails.scss';
import HeaderHome from '../../components/layout/header/HeaderHome';
import Comment from '../../components/comment/Comment';
import {
  getFeedbackFromDB,
  getUserProfileFromDB
} from '../../database/dal/firebase/homeDal';
import * as actionTypes from '../../spinnerStore/actions';
import { getBlogByIdFromDB } from './../../database/dal/firebase/TeacherBlog';
import renderHTML from 'react-render-html';

class BlogDetails extends Component {
  
    state = {
      loggedInUser: {},
      blogComment: [],
      isFocus: false,
      blogDetail : {}
    };


  componentDidMount=()=>{
    
    getBlogByIdFromDB(this.props.match.params.id).then((doc) => {
        this.setState({blogDetail: doc.data()});
        console.log('sssss',this.state)
    }).catch(function() {
    });
  }

  componentDidMount = () =>{
    const blogId = this.props.match.params.id;
    // For Comment Section
    getBlogByIdFromDB(blogId).then((doc) => {
      if (doc.exists) {
          this.setState({
            blogDetail : doc.data()
          })
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
    if(blogId){
      getFeedbackFromDB(blogId).onSnapshot(querySnapshot => {
        let tempArr = {};
        let feedbackData = [];
        querySnapshot.forEach(doc => {
          getUserProfileFromDB(doc.data().user_id).onSnapshot(
            querySnapshot => {
              querySnapshot.forEach(profileData => {
                tempArr["feedbackId"] = doc.id;
                tempArr["profileData"] = profileData.data();
                tempArr["feedback"] = doc.data();         
            
                feedbackData.push(tempArr);
                feedbackData = feedbackData.sort((a, b) => a.feedback.created_date.second < b.feedback.created_date.second);
                this.setState({
                  blogComment: feedbackData
                });
                tempArr = {};
              });
              this.props.setSpinnerStatus(false);
            },
            error => {
              this.props.setSpinnerStatus(false);
              toastr.error(error.message);
            }
          );
        });
      });
    }
  }

  render() {
    const blogId = this.props.match.params.id;
    
    console.log('--blogComment--', this.state.blogComment);

    // const isLogedIn = localStorage.getItem('user');
    const { isFocus, blogDetail } = this.state;   
    console.log('blogDetail', blogDetail);
    console.log(this.state) 
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
    this.user = user;

    const isLogedIn = localStorage.getItem('user');
    const loggedInUser = JSON.parse(localStorage.getItem('userProfile'));
    const teacherId = 'sWjf83MlPTav3HPgTrNismT5s4h1';
    return (
      <div className="details-wrapper blog-details">
        <HeaderHome />
        {blogDetail && (
        <>
        <div className="bnr-section">
         
          <span className="blog-text">Blog</span>
          <div className="blog-profile-img">
            <div className="profile-img-section">
            <img
            alt=""
            src={blogDetail.tImage}
            className="bnr-img"
          />
            </div>
            <RatingComponent
              name="rate1"
              starCount={5}
              value={blogDetail.Trating}
            />
          </div>
        </div>
        <div className="profile-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                {/* <div className="img-details-wrapper">
                 <img
                  alt=""
                  src={blogDetail.uploadedImage}
                  className="bnr-img"
                /> 
                </div> */}
                <h2>{blogDetail.blogTitle}</h2>
                {blogDetail.blogDescription ? renderHTML(blogDetail.blogDescription) : null}
              </div>
            </div>
          </div>
        </div>
        </>
        )}
        <Comment
            source="Blog"
            blogId={blogId}
            teacherId={teacherId}
            loggedInUser={loggedInUser}
            commentRows={this.state.blogComment}
            isFocus={isFocus}
        />
      </div>
    )
  }  
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
  return {
    setSpinnerStatus: value => {
      dispatch({type: actionTypes.SPINNER_STATUS, payload: value})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails);
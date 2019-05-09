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

class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      blogComment: [],
      isFocus: false
    };
  }

  componentDidMount = () =>{
    const blogId = this.props.match.params.id;
    // For Comment Section

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
    const { isFocus } = this.state;
    const blogId = this.props.match.params.id;
    
    // const isLogedIn = localStorage.getItem('user');
    const loggedInUser = JSON.parse(localStorage.getItem('userProfile'));
    const teacherId = 'sWjf83MlPTav3HPgTrNismT5s4h1';
    return (
      <div className="details-wrapper blog-details">
        <HeaderHome />
        <div className="bnr-section">
          {/* <img src={profileImgs} className="bnr-img1"/> */}
          <img
            alt=""
            src="../../../../Assets/hdpi/detail-banner.jpg"
            className="bnr-img"
          />
          <span className="blog-text">Blog</span>
          <div className="blog-profile-img">
            <div className="profile-img-section"></div>
            <RatingComponent
              name="rate1"
              starCount={5}
              value={3}
            />
          </div>
        </div>
        <div className="profile-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="img-details-wrapper">
                  img
                </div>
                <h2>Header</h2>
                <p>Internet Explorer 10-11 do not render inline elements like links or images ( Internet Explorer 10-11 do not render inline elements like links or images (Internet Explorer 10-11 do not render inline elements like links or images ( Internet Explorer 10-11 do not render inline elements like links or images (Internet Explorer 10-11 do not render inline elements like links or images ( Internet Explorer 10-11 do not render inline elements like links or images (Internet Explorer 10-11 do not render inline elements like links or images ( Internet Explorer 10-11 do not render inline elements like links or images ( Internet Explorer 10-11 do not render inline elements like links or images ( Internet Explorer 10-11 do not render inline elements like links or images (Internet Explorer 10-11 do not render inline elements like links or images ( Internet Explorer 10-11 do not render inline elements like links or images (Internet Explorer 10-11 do not render inline elements like links or images ( Internet Explorer 10-11 do not render inline elements like links or images (Internet Explorer 10-11 do not render inline elements like links or images ( Internet Explorer 10-11 do not render inline elements like links or images ((</p>
              </div>
            </div>
          </div>
        </div>

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
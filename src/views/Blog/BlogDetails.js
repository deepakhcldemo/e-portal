import React, { Component } from 'react';
import RatingComponent from 'react-star-rating-component';

import '../Teacher/teacher-details/teacherDetails.scss';
import './BlogDetails.scss';
import HeaderHome from '../../components/layout/header/HeaderHome';
import Comment from '../../components/comment/Comment';

class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      blogComment: [],
      isFocus: false
    };
  }

  render() {
    const { isFocus } = this.state;
    
    const teacherId = this.props.match.params.id;
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
    this.user = user;

    const isLogedIn = localStorage.getItem('user');
    const loggedInUser = JSON.parse(localStorage.getItem('userProfile'));

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
            teacherId={this.state.teacherId}
            loggedInUser={loggedInUser}
            commentRows={this.state.blogComment}
            isFocus={isFocus}
            updateTotalComments={this.updateTotalComments}
        />
      </div>
    )
  }
}
export default BlogDetails;
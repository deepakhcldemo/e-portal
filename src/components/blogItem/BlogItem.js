import React, { Component } from 'react';
import './BlogItem.css';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';

class BlogItem extends Component {
  render() {
    const { blogDetails, linkTo } = this.props;
    console.log('-----------------===========', blogDetails);
    const name =
      blogDetails.profileData.firstName +
      ' ' +
      blogDetails.profileData.lastName;

    return (
      <>
        <Link
          className="link-thumb"
          style={{ padding: '0px' }}
          to={linkTo ? linkTo : '#'}
          title={blogDetails.feedback.blogTitle}
        >
          <div>
            <div className="vd-wrapper vd-wrapper--border col-xs-12">
              <div className="thumb-wrapper thumb-wrapper--style">
                <div className="profile-pic-block">
                  <img src={blogDetails.profileData.profileImage} alt="" />
                </div>
              </div>

              <div className="vd-content comment-box--style avatar-container">
                <h6 className="student-title--align student-title--border">
                  {name.trim()}
                </h6>
              </div>
            </div>
            <div>
              <div className="blog-section--style">
                {blogDetails.feedback.blogTitle
                  ? renderHTML(blogDetails.feedback.blogTitle)
                  : null}
              </div>
            </div>
          </div>
        </Link>
      </>
    );
  }
}

export default BlogItem;

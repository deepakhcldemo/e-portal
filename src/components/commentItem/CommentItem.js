import React, { Component } from 'react';
import './CommentItem.css';

class CommentItem extends Component {
  render() {
    const { commentDetails } = this.props;
    return (
      <div>
        <div className="user-profile-card--padding">
          <div className="vd-wrapper col-xs-12">
            <div className="profile-pic--align">
              <div
                style={{
                  backgroundImage: `url( ${
                    commentDetails.profileData.profileImage
                  } )`,
                  backgroundPosition: 'top center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height: '100px',
                  width: '100px',
                  borderRadius: '50px',
                  margin: '10px'
                }}
                className="border_1px"
              />
            </div>

            <div className="vd-content comment-box--style">
              <h6 className="student-title--align">
                {commentDetails.profileData.firstName +
                  ' ' +
                  commentDetails.profileData.lastName}
              </h6>

              <span style={{ fontSize: '25px' }}>&#10077;</span>
              <p className="block-with-text">
                {commentDetails.feedback.comment}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentItem;

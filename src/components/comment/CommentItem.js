import React, { Component } from 'react';
import moment from 'moment';
import './CommentItem.css';
import CommentLikeUnlike from './CommentLikeUnlike';

class CommentItem extends Component {
  render() {
    const { commentDetails } = this.props;
    const isLogedIn = localStorage.getItem('user');

    const commentRows = commentDetails.map((commentDetail, index) => {
      const name =
        commentDetail.profileData.firstName +
        ' ' +
        commentDetail.profileData.lastName;
      return (
        <div className="comment-thread-element" key={index}>
          <div className="author-thumbnail">
            {commentDetail.profileData && (
              <img
                src={commentDetail.profileData.profileImage}
                alt={
                  commentDetail.profileData.firstName +
                  ' ' +
                  commentDetail.profileData.lastName
                }
                title={
                  commentDetail.profileData.firstName +
                  ' ' +
                  commentDetail.profileData.lastName
                }
                className="profile-img"
              />
            )}
          </div>
          <div className="comment-content">
            <div className="comment-hdr d-flex align-items-center justify-content-between">
              <span className="date">
                <strong>{name.trim()}</strong>
                {commentDetail.feedback.created_date &&
                  moment(commentDetail.feedback.created_date.toDate()).format(
                    'MM/DD/YYYY'
                  )}
              </span>
              <div className="icon-section d-flex">
                <div className="icon">
                  <button className="btn btn-transparent" disabled={!isLogedIn}>
                    <i className="fas fa-thumbs-up" />{' '}
                  </button>
                </div>
                <div className="icon">
                  <button className="btn btn-transparent" disabled={!isLogedIn}>
                    <i className="fas fa-thumbs-down" />
                  </button>
                </div>
                <div className="icon">
                  <button className="btn btn-transparent" disabled={!isLogedIn}>
                    <i className="fas fa-comment-alt" />
                  </button>
                </div>
              </div>
              {/* <CommentLikeUnlike feedbackId={commentDetails.feedbackId}/> */}
            </div>

            <p>{commentDetail.feedback.comment}</p>
          </div>
        </div>
      );
    });

    return commentRows;
  }
}

export default CommentItem;

import React, { Component } from 'react';
import moment from 'moment';
import './CommentItem.css';
import CommentLikeUnlike from './CommentLikeUnlike';
import { getCommentRating } from "../../database/dal/firebase/commentDal";

class CommentItem extends Component {
  constructor(props) {		
    super(props);		
    this.state = {		
      totalLike:0,		
      totalUnLike: 0,		
      feedbackby:''		
    };		
  }

  render() {
    const { commentDetails } = this.props;
    const isLogedIn = localStorage.getItem('user');

    const commentRows = commentDetails.map((commentDetail, index) => {
      
      const name = commentDetail.profileData.firstName + ' ' + commentDetail.profileData.lastName;
      const totalLike = commentDetail.feedback.like? commentDetail.feedback.like: 0;
      const totalUnLike = commentDetail.feedback.unlike? commentDetail.feedback.unlike: 0;
      const feedbackby = commentDetail.feedback.feedbackby? commentDetail.feedback.feedbackby: '';
      
      return (
        <div className="comment-thread-element" key={index}>
          <div className="author-thumbnail">
            {commentDetail.profileData && 
                <img src={commentDetail.profileData.profileImage} 
                alt={name.trim()}
                title={name.trim()}
                className="profile-img"/>
            }
          </div> 
          <div className="comment-content">
            <div className="comment-hdr d-flex align-items-start justify-content-between">
              <span className="date">
                    <strong>{name.trim()}</strong> 
                    {   
                        commentDetail.feedback.created_date &&
                        moment(commentDetail.feedback.created_date.toDate()).format("MM/DD/YYYY") 
                    }
                    </span>

                    <CommentLikeUnlike 
                    feedbackId={commentDetail.feedbackId} 
                    totalLike={totalLike} 
                    totalUnLike={totalUnLike} 
                    feedbackby={feedbackby} />  
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

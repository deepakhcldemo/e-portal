import React, { Component } from "react";
import "./CommentItem.css";

class CommentItem extends Component {
  render() {
    const { commentDetails } = this.props;
    return (
      <div className="card">
        <div className="card-body user-profile-card--padding">
          <div className="vd-wrapper col-xs-12">
            <div
              style={{
                backgroundImage: `url( ${
                  commentDetails.profileData.profileImage
                } )`,
                backgroundPosition: "top center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "200px",
                margin: "10px"
              }}
              className="border_1px"
            />

            <div className="vd-content comment-box--height">
              <h6>
                {commentDetails.profileData.firstName +
                  " " +
                  commentDetails.profileData.lastName}
              </h6>
              <p className="block-with-text">
                {" "}
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

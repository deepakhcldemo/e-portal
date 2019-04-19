import React, { Component } from 'react';
import './VideoItem.css';
import StarRatingComponent from 'react-star-rating-component';

class VideoItem extends Component {
  render() {
    const { videoDetails } = this.props;
    return (
      <div className="card">
        <div className="card-body user-profile-card--padding">
          <div className="vd-wrapper  col-xs-12">
            <div className="border_1px">
              <video width="400" controls>
                <source src={videoDetails.videoSrc} type="video/mp4" />
              </video>
            </div>

            <div className="vd-content user-details--height">
              <h6>{videoDetails.title}</h6>
              <p>{videoDetails.noOfDays} days ago.</p>
              {/* <p>Rating: {videoDetails.rating ? videoDetails.rating : 0}/5 </p> */}
              <StarRatingComponent
                name="rate"
                starCount={5}
                value={videoDetails.rating}
                // onStarClick={this.onStarClick.bind(this)}
              />
              <span className="rating-position">
                ({videoDetails.noOfRatings})
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoItem;

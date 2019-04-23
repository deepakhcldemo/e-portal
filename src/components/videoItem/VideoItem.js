import React, { Component } from 'react';
import './VideoItem.css';
import StarRatingComponent from 'react-star-rating-component';

class VideoItem extends Component {
  render() {
    const { isNotVisibleVideoMeta, videoDetails } = this.props;
    return (
      <>
      {videoDetails && (
        <div className="card">
          <div className="card-body user-profile-card--padding">
            <div className="vd-wrapper  col-xs-12">
              <div className="border_1px">
                <video width="400" preload="none" poster={videoDetails.thumb}>
                  <source src={videoDetails.src} type="video/mp4" />
                </video>
              </div>
              <div className="vd-content user-details--height">
                <h6>{videoDetails.title}</h6>
                <p>{videoDetails.createdDate}</p>
                {!isNotVisibleVideoMeta && (
                  <>
                  <StarRatingComponent
                    name="rate"
                    starCount={5}
                    value={videoDetails.rating}
                    // onStarClick={this.onStarClick.bind(this)}
                  />
                  <span className="rating-position">
                    ({videoDetails.views})
                  </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </>
    );
  }
}

export default VideoItem;

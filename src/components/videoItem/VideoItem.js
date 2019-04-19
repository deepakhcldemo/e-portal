import React, { Component } from 'react';
import './VideoItem.css.css';

class VideoItem extends Component {
  render() {
    const { videoDetails } = this.props;
    return (
      <div className="card">
        <div className="card-body user-profile-card--padding">
          <div className="vd-wrapper  col-xs-12">
            <div
              style={{
                backgroundImage: `url( ${videoDetails.profileImage} )`,
                backgroundPosition: 'top center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '200px',
                margin: '10px',
                borderRadius: '100px'
              }}
              className="border_1px"
            />

            <div className="vd-content user-details--height">
              <h6>{videoDetails.firstName + ' ' + videoDetails.lastName}</h6>
              <p>Registered {videoDetails.noOfDays} days ago.</p>
              <p>Subject: {videoDetails.subject}</p>
              <p>Rating: {videoDetails.rating ? videoDetails.rating : 0}/5 </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoItem;

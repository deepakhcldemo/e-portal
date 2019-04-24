import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import VideoPopup from '../videopopup/VideoPopup'
import './VideoItem.css';

class VideoItem extends Component {
  state = {
    modalOpen: false,
    userDetails: ''
  }

  handleClick = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem('userProfile'))
    })
  }

  render() {
    const { isNotVisibleVideoMeta, videoDetails } = this.props;
    const { modalOpen, userDetails } = this.state;
    return (
      <>
      {videoDetails && (
        <div className="card">
          <div className="card-body user-profile-card--padding">
            <div className="vd-wrapper  col-xs-12">
              <div
                onClick={this.handleClick}
                style={{
                  cursor: 'pointer',
                  backgroundImage: `url( ${
                    videoDetails.thumb
                  } )`,
                  backgroundPosition: "top center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  height: "100px",
                  margin: "10px"
                }}
                className="border_1px"
              />
              <div className="vd-content user-details--height">
                <h6>{videoDetails.title}</h6>
                <p>{videoDetails.createdDate}</p>
                {!isNotVisibleVideoMeta && (
                  <>
                  <StarRatingComponent
                    name="rate"
                    starCount={5}
                    value={videoDetails.rating}
                    editing={false}
                  />
                  <span className="rating-position">
                    ({videoDetails.views})
                  </span>
                  </>
                )}
              </div>
            </div>
          </div>  
          {modalOpen && (        
            <VideoPopup userDetails={userDetails} videoDetails={videoDetails} onVideoClose={this.handleClick}/>
          )}
        </div>
      )}
      </>
    );
  }
}

export default VideoItem;

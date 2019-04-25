import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-responsive-modal';
import './VideoPopup.css';

class VideoPopup extends Component {

  state = {
    open: true
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
    this.props.onVideoClose(this.state.open)
  }

  onStarClick = (e) => {
    console.log(e)
  }

  render() {
    const { videoDetails, userDetails } = this.props;
    return (
      <>
      {videoDetails && (
          <Modal open={this.state.open} onClose={this.handleClick} center 
          closeOnEsc={false} 
          closeOnOverlayClick={false}>
            <video width="100%" controls 
            poster={videoDetails.thumb}
            preload="auto" autoPlay={true} className="video-margin">
              <source src={videoDetails.src} type="video/mp4" />
            </video>            
            <div className="video-meta-data">
                {(userDetails) && (
                  <span>
                  <small>Your Rating</small>
                    <StarRatingComponent                
                      name="rate1"
                      starCount={5}
                      value={5} // {videoDetails.videMetadata[userDetails.userId].rating}
                      onStarClick={(event) => this.onStarClick(event)}
                    />
                  </span>
                )}
                  <span>
                    <small>Overall Rating</small>
                    <StarRatingComponent
                      name="rate2"
                      starCount={5}
                      value={videoDetails.rating}
                      editing={false}
                    />
                  </span>
                  <span>
                  <small>Views</small>
                    <div className="views">{videoDetails.views}</div>
                  </span>
            </div>
          </Modal>
      )}
      </>
    );
  }
}

export default VideoPopup;

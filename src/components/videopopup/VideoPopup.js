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
    const styles = {
      closeIcon:{
        top: '0',
        right: '0'
      } 
    } 

    return (
      <>
      {videoDetails && (
          <Modal styles={styles} open={this.state.open} onClose={this.handleClick} center 
          closeOnEsc={false} 
          closeOnOverlayClick={false}>
          <div className="row">
            <div className="col-12">
                <video width="100%" controls 
                poster={videoDetails.thumb}
                preload="auto" autoPlay={true} className="video-margin">
                  <source src={videoDetails.src ? videoDetails.src : videoDetails.sVideo} type="video/mp4" />
                </video>            
                <h6 className="video-title">{videoDetails.title ? videoDetails.title : videoDetails.notificationDesc}</h6>
                <div className="video-meta-data">
                      {(userDetails && !videoDetails.sVideo) && (
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
                    {!videoDetails.sVideo && (
                      <>
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
                        <div>{videoDetails.views}</div>
                      </span>
                      </>
                    )}
                </div>
              </div>
            </div>
          </Modal>
      )}
      </>
    );
  }
}

export default VideoPopup;

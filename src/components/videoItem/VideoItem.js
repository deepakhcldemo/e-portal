import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-responsive-modal';
import './VideoItem.css';

class VideoItem extends Component {
  state = {
    open: false
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { isNotVisibleVideoMeta, videoDetails } = this.props;
    return (
      <>
      {videoDetails && (
        <div className="card">
          <div className="card-body user-profile-card--padding">
            <div className="vd-wrapper  col-xs-12">
              <div className="border_1px">
                <video width="400" preload="none" poster={videoDetails.thumb} onClick={this.handleClick}>
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
          <Modal open={this.state.open} onClose={this.handleClick} center>
            <video width="100%" controls autoPlay={true}>
              <source src={videoDetails.src} type="video/mp4" />
            </video>
          </Modal>
        </div>

      )}
      </>
    );
  }
}

export default VideoItem;

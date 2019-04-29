import React, { Component } from 'react';
import moment from 'moment';
// import { NavLink } from 'react-router-dom'
import StarRatingComponent from "react-star-rating-component";
import VideoPopup from "./../../../components/videopopup/VideoPopup";
import "./videolist.scss";
import GLOBAL_VARIABLES from "../../../config/config";

class VideoList extends Component {
  state = {
    modalOpen: false,
    userDetails: '',
    videoData: ''
  };

  handleClick = videoData => {
    this.setState({
      videoData,
      modalOpen: !this.state.modalOpen
    });
  };

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem('userProfile'))
    });
  };

  render = () => {
    const { heading, videoDetails } = this.props;
    const { modalOpen, userDetails, videoData } = this.state;
    return (
      <div className="card video-container--background">
        <div className="card-body">
          {this.props.children && (
            <h4>
              {this.props.children}
            </h4>
          )}
          {videoDetails.length === 0 && (
            <h6>No {heading}</h6>
          )}
          <ul className="list-unstyled video-list-thumbs">
            {videoDetails &&
              videoDetails.map((videoDetail, index) => {
                videoDetail.date = videoDetail.created
                  ? moment(videoDetail.created.toDate()).fromNow()
                  : '';
                videoDetail.thumb = videoDetail.thumb
                  ? videoDetail.thumb
                  : GLOBAL_VARIABLES.VIDEO_PLACEHOLDER;
                return (
                  <li className="card" key={index}>
                    <a onClick={() => this.handleClick(videoDetail)} href="#1">
                      <img
                        src={videoDetail.thumb}
                        alt={videoDetail.title}
                        className="img-responsive"
                        height="130px"
                      />
                      <h2>{videoDetail.title ? videoDetail.title : videoDetail.notificationDesc}</h2>
                      <i className="fas fa-play-circle" />
                      <h6>{videoDetail.date}</h6>
                    </a>
                    <h5>
                      <StarRatingComponent
                        name="rate"
                        starCount={5}
                        value={videoDetail.rating}
                        editing={false}
                      />
                    </h5>
                  </li>
                );
              })}
          </ul>
        </div>
        {modalOpen && (
          <VideoPopup
            userDetails={userDetails}
            videoDetails={videoData}
            onVideoClose={this.handleClick}
          />
        )}
      </div>
    );
  };
}
export default VideoList;

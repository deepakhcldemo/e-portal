import React, { Component } from "react";
import "./teacherDetails.scss";
import { connect } from "react-redux";
import _ from "lodash";

import RatingComponent from "react-star-rating-component";
import classnames from "classnames";
import * as actionTypes from "../../../spinnerStore/actions";
import ModalPopUp from "../../../shared/components/modalpopup/modalpopup";
import HeaderHome from "../../../components/layout/header/HeaderHome";
// import profileImgs from '../../../images/profile-imgs.png';

import { openModalForRequest } from "./teacher-details.action";
import {
  getTeacherDetailFromDB,
  getTeacherRating,
  saveTeacherRating
} from "../../../database/dal/firebase/teacherDetailDal";
import { getCurriculumFromDB } from "../../../database/dal/firebase/curriculumDal";
// import GLOBAL_VARIABLES from '../../../config/config';
import RecentVideo from "../../../components/recentVideo/RecentVideo";
import bannerImg from "../../../images/detail-banner.jpg";

class TeacherDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailModel: {
        teacherId: "",
        title: "title",
        description: "this is demo",
        rating: 7,
        gender: "",
        subject: "",
        imgPath: ""
      },
      starRating: 0,
      totalUser: 0,
      carousellistNewlyItems: [],
      loggedInUser: {}
    };
    this.openModalForRequest = this.openModalForRequest.bind(this);
  }

  componentDidMount() {
    this.props.setSpinnerStatus(true);
    const teacherId = this.props.match.params.id;
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    /* show rating on the base of existing user has given */
    getTeacherRating(teacherId).then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const ratings = data.ratings;
        const nOfUser = ratings.length;
        // this.setState({totalUser: nOfUser})
        if (nOfUser > 0) {
          let totalRating = Math.round(this.getTotalRating(ratings, nOfUser));

          if (user) {
            const userId = user.user.uid;
            let currentUser = _.filter(
              ratings,
              user => user.userId === userId
            )[0];
            if (!currentUser) {
              currentUser = { userId: userId, like: 0, dislike: 0, rating: 0 };
              ratings.push(currentUser);
            }
            data.rating = totalRating;
            saveTeacherRating(teacherId, data);
            this.setState({ starRating: Math.round(currentUser.rating) });
          } else {
            this.setState({ starRating: totalRating });
          }
        } else {
          if (user) {
            const userId = user.user.uid;
            // let currentUser = _.filter(ratings, (user) => user.userId === userId)[0];
            let newUser = { userId: userId, like: 0, dislike: 0, rating: 0 };

            ratings.push(newUser);
            let totalRating = Math.round(this.getTotalRating(ratings, nOfUser));
            data.rating = totalRating;

            saveTeacherRating(teacherId, data);
            this.setState({ starRating: newUser.rating });
          }
        }
      }
    });

    getTeacherDetailFromDB(teacherId).then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        // this.setState({ spinner: false });
        // Create model
        this.props.setSpinnerStatus(false);
        this.getDetails(data);
      });
    });

    /* Get curriculum videos */
    const userId = user ? user.user.uid : "";
    getCurriculumFromDB(userId).onSnapshot(querySnapshot => {
      let currData = [];
      querySnapshot.forEach(doc => {
        currData.push(doc.data());
      });
      if (currData.length > 0) {
        this.setState({
          carousellistNewlyItems: currData
        });
      }
      currData = [];
    });
  }

  getTotalRating(ratings, nOfUser) {
    let rating = 0;
    let totalRating = 0;
    ratings.forEach(user => {
      rating = rating + user.rating;
    });
    if (!rating / nOfUser) {
      totalRating = 0;
    } else {
      totalRating = rating / nOfUser;
    }

    return totalRating;
  }

  getDetails(data) {
    if (data) {
      const detailModel = { ...this.state.detailModel };
      detailModel.teacherId = data.userId;
      detailModel.title = data.firstName + " " + data.lastName;
      detailModel.description = data.summary;
      detailModel.rating = data.rating;
      detailModel.gender = data.gender;
      detailModel.subject = data.subject;
      detailModel.imgPath = data.profileImage;

      this.setState({ detailModel });
    }
  }

  navigateToLogin() {
    const currentId = this.props.match.params.id;
    localStorage.setItem("teacherDetailId", currentId);
    this.props.history.push("/login");
  }

  onStarClick(nextValue, prevValue, name) {
    // console.log('prevValue', prevValue)
    // console.log('nextValue', nextValue)

    const teacherId = this.props.match.params.id;
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    /* show rating on the base of existing user has given */
    getTeacherRating(teacherId).then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const ratings = data.ratings;
        const nOfUser = ratings.length;

        if (nOfUser > 0) {
          if (user) {
            const userId = user.user.uid;
            let currentUser = _.filter(
              ratings,
              user => user.userId === userId
            )[0];
            let newUser = { userId: "0", like: 0, dislike: 0, rating: 0 };
            if (currentUser) {
              currentUser.rating = nextValue;
            } else {
              newUser.userId = userId;
              currentUser = newUser;
              ratings.push(currentUser);
            }
            let totalRating = Math.round(this.getTotalRating(ratings, nOfUser));
            data.rating = totalRating;
            saveTeacherRating(teacherId, data);
            this.setState({ starRating: nextValue });
          }
        } else {
          if (user) {
            const userId = user.user.uid;
            let currentUser = _.filter(
              ratings,
              user => user.userId === userId
            )[0];
            let newUser = {
              userId: userId,
              like: 0,
              dislike: 0,
              rating: nextValue
            };

            if (currentUser) {
              currentUser.rating = nextValue;
            } else {
              currentUser = newUser;
              ratings.push(currentUser);
            }
            let totalRating = Math.round(this.getTotalRating(ratings, nOfUser));
            data.rating = totalRating;

            saveTeacherRating(teacherId, data);
            this.setState({ starRating: nextValue });
          }
        }
      }
    });
  }

  openModalForRequest = () => {
    this.props.openModalPopUp();
  };
  render() {
    const {
      title,
      description,
      /* rating, */
      subject,
      imgPath
    } = this.state.detailModel;
    const { carousellistNewlyItems } = this.state;
    const isLogedIn = localStorage.getItem("user");
    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    return (
      <React.Fragment>
        <div className="details-wrapper">
          {isLogedIn && <ModalPopUp teacherDeatils={this.state.detailModel} />}

          <HeaderHome />
          <div className="bnr-section">
            {/* <img src={profileImgs} className="bnr-img1"/> */}
            <img alt="" src={bannerImg} className="bnr-img" />
          </div>
          <div className="profile-section">
            <div className="container">
              <div className="row">
                <div className="col-sm-3">
                  <div className="profile-img-section">
                    <img className="profile-img" src={imgPath} alt="..." />
                  </div>
                  <div className="icon-section d-flex">
                    <div className="icon">
                      <button
                        className="btn btn-transparent"
                        disabled={!isLogedIn}
                      >
                        <i className="fas fa-thumbs-up" /> <span>1000</span>
                      </button>
                    </div>
                    <div className="icon">
                      <button
                        className="btn btn-transparent"
                        disabled={!isLogedIn}
                      >
                        <i className="fas fa-thumbs-down" /> <span>1000</span>
                      </button>
                    </div>
                    <div className="icon">
                      <button
                        className="btn btn-transparent"
                        disabled={!isLogedIn}
                      >
                        <i className="fas fa-comment-alt" /> <span>1000</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-9">
                  <div>
                    <h3>{title}</h3>
                    <span className="sub-title">Subject: {subject}</span>
                    <div
                      className={classnames({
                        "disbaled-stars": !isLogedIn,
                        "ratings-wrpr": true
                      })}
                    >
                      <RatingComponent
                        name="rate1"
                        starCount={5}
                        value={this.state.starRating}
                        onStarClick={this.onStarClick.bind(this)}
                      />
                    </div>
                  </div>
                  <p className="description">{description}</p>

                  {!isLogedIn && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={e => this.navigateToLogin()}
                    >
                      Login to view more
                    </button>
                  )}
                  {isLogedIn && (
                    <div>
                      <button className="btn btn-outline-primary">
                        Send Request
                      </button>
                      {loggedInUser.role === "Student" ? (
                        <button
                          className="btn btn-outline-primary"
                          onClick={this.openModalForRequest}
                        >
                          Request For Review
                        </button>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="top-courses-section">
            <div className="container">
              <div className="vd-section">
                <div className="row">
                  <RecentVideo
                    carousellistNewlyItems={carousellistNewlyItems}
                    headeTitle="RECENT VIDEOS"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="comments-section">
            <div className="text-field-section">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="comments-hdr-section">
                      <div className="author-thumbnail">
                        <img
                          src="https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png"
                          alt=""
                        />
                      </div>
                      <div className="comments-input">
                        <input
                          type="text"
                          className="auto-input form-control"
                          placeholder="Add a comment"
                        />
                      </div>
                      <div className="total-comments">
                        <span className="count">1</span>
                        <span className="count-text">Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="comment-thread-element">
                    <div className="author-thumbnail">
                      <img
                        src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
                        alt=""
                      />
                    </div>
                    <div className="comment-content">
                      <i className="fas fa-caret-left" />
                      <div className="comment-hdr d-flex align-items-center justify-content-between">
                        <span className="date">23/04/2019</span>
                        <div className="icon-section d-flex">
                          <div className="icon">
                            <button
                              className="btn btn-transparent"
                              disabled={!isLogedIn}
                            >
                              <i className="fas fa-thumbs-up" />{" "}
                            </button>
                          </div>
                          <div className="icon">
                            <button
                              className="btn btn-transparent"
                              disabled={!isLogedIn}
                            >
                              <i className="fas fa-thumbs-down" />
                            </button>
                          </div>
                          <div className="icon">
                            <button
                              className="btn btn-transparent"
                              disabled={!isLogedIn}
                            >
                              <i className="fas fa-comment-alt" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p>
                        Is dolor sit amet long established fact that a reader
                        will be distracted by the readable content of a page
                        when looking at its layout. The point of using Lorem
                        Ipsum is that it has a more-or-less normal. Color sit
                        amet long established fact that a reader will be
                        distracted by the readable
                      </p>
                    </div>
                  </div>

                  <div className="comment-thread-element">
                    <div className="author-thumbnail">
                      <img
                        src="https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png"
                        alt=""
                      />
                    </div>
                    <div className="comment-content">
                      <i className="fas fa-caret-left" />
                      <div className="comment-hdr d-flex align-items-center justify-content-between">
                        <span className="date">23/04/2019</span>
                        <div className="icon-section d-flex">
                          <div className="icon">
                            <button
                              className="btn btn-transparent"
                              disabled={!isLogedIn}
                            >
                              <i className="fas fa-thumbs-up" />{" "}
                            </button>
                          </div>
                          <div className="icon">
                            <button
                              className="btn btn-transparent"
                              disabled={!isLogedIn}
                            >
                              <i className="fas fa-thumbs-down" />
                            </button>
                          </div>
                          <div className="icon">
                            <button
                              className="btn btn-transparent"
                              disabled={!isLogedIn}
                            >
                              <i className="fas fa-comment-alt" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p>
                        Is dolor sit amet long established fact that a reader
                        will be distracted by the readable content of a page
                        when looking at its layout.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalState: state.teacherDetailsReducer.requestForReviewPop
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModalPopUp: () => dispatch(openModalForRequest()),
    setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetails);

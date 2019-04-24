import React, { Component } from 'react';
import './teacherDetails.scss';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Spinner } from 'react-bootstrap';
import RatingComponent from 'react-star-rating-component';
import classnames from 'classnames';

import ModalPopUp from '../../../shared/components/modalpopup/modalpopup';
import HeaderHome from '../../../components/layout/header/HeaderHome';

import { openModalForRequest } from './teacher-details.action';
import {
  getTeacherDetailFromDB,
  getTeacherRating,
  saveTeacherRating
} from '../../../database/dal/firebase/teacherDetailDal';
import { getCurriculumFromDB } from '../../../database/dal/firebase/curriculumDal';
import GLOBAL_VARIABLES from '../../../config/config';
import RecentVideo from '../../../components/recentVideo/RecentVideo';

class TeacherDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailModel: {
        teacherId: '',
        title: 'title',
        description: 'this is demo',
        rating: 7,
        gender: '',
        subject: '',
        imgPath: ''
      },
      spinner: true,
      starRating: 0,
      totalUser: 0,
      carousellistNewlyItems: []
    };
    this.openModalForRequest = this.openModalForRequest.bind(this);
  }

  componentDidMount() {
    const teacherId = this.props.match.params.id;
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
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
        this.setState({ spinner: false });
        // Create model
        this.getDetails(data);
      });
    });

    /* Get curriculum videos */
    const userId = user ? user.user.uid : '';
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
      detailModel.title = data.firstName + ' ' + data.lastName;
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
    localStorage.setItem('teacherDetailId', currentId);
    this.props.history.push('/login');
  }

  onStarClick(nextValue, prevValue, name) {
    // console.log('prevValue', prevValue)
    // console.log('nextValue', nextValue)

    const teacherId = this.props.match.params.id;
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
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
            let newUser = { userId: '0', like: 0, dislike: 0, rating: 0 };
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
    const isLogedIn = localStorage.getItem('user');
    return (
      <React.Fragment>
        {this.state.spinner && (
          <div className="dark-bg">
            <Spinner
              animation="border"
              className="spinner-center"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}

        <div className="details-wrapper">
          {isLogedIn && <ModalPopUp teacherDeatils={this.state.detailModel} />}

          <HeaderHome />

          <div className="card">
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row main-setion">
                          <div className="col-sm-3">
                            <img
                              className="profile-img"
                              src={imgPath}
                              alt="..."
                            />
                          </div>
                          <div className="col-sm-9">
                            <div>
                              <h4>{title}</h4>
                              <span className="sub-title">
                                Subject: {subject}
                              </span>
                              <div
                                className={classnames({
                                  'disbaled-stars': !isLogedIn
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
                            <p>{description}</p>

                            <div className="icon-section d-flex">
                              <div className="icon">
                                <button
                                  className="btn btn-transparent"
                                  disabled={!isLogedIn}
                                >
                                  <i className="fas fa-thumbs-up" />{' '}
                                  <span>1000</span>
                                </button>
                              </div>
                              <div className="icon">
                                <button
                                  className="btn btn-transparent"
                                  disabled={!isLogedIn}
                                >
                                  <i className="fas fa-thumbs-down" />{' '}
                                  <span>1000</span>
                                </button>
                              </div>
                              <div className="icon">
                                <button
                                  className="btn btn-transparent"
                                  disabled={!isLogedIn}
                                >
                                  <i className="fas fa-comment-alt" />{' '}
                                  <span>1000</span>
                                </button>
                              </div>
                            </div>
                            {!isLogedIn && (
                              <button
                                className="btn btn-primary"
                                onClick={e => this.navigateToLogin()}
                              >
                                Login to view more
                              </button>
                            )}
                            {isLogedIn && (
                              <div>
                                <button className="btn btn-dark">
                                  Send Request
                                </button>
                                <button
                                  className="btn btn-dark"
                                  onClick={this.openModalForRequest}
                                >
                                  Request For Review
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="vd-section">
                          {/* <Slider listTop10Items={['a','b']}>
                                        <h4 className="mt-30 pad10">
                                            Online Courses
                                            <i className="fas fa-chevron-right" />
                                        </h4>
                                        </Slider> */}

                          <RecentVideo
                            carousellistNewlyItems={carousellistNewlyItems}
                            headeTitle={GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="comments-hdr-section">
                          <div className="author-thumbnail">img</div>
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

                        <div className="comment-thread-element">
                          <div className="author-thumbnail">img</div>
                          <div className="comment-content">
                            <span className="date">Comment mm/dd/yyy</span>
                            <p>
                              Is dolor sit amet long established fact that a
                              reader will be distracted by the readable content
                              of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has a more-or-less
                              normal. Color sit amet long established fact that
                              a reader will be distracted by the readable
                            </p>
                            <div className="icon-section d-flex">
                              <div className="icon">
                                <button
                                  className="btn btn-transparent"
                                  disabled={!isLogedIn}
                                >
                                  <i className="fas fa-thumbs-up" />{' '}
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
                        </div>

                        <div className="comment-thread-element">
                          <div className="author-thumbnail">img</div>
                          <div className="comment-content">
                            <span className="date">Comment mm/dd/yyy</span>
                            <p>
                              Is dolor sit amet long established fact that a
                              reader will be distracted by the readable content
                              of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has a more-or-less
                              normal. Color sit amet long established fact that
                              a reader will be distracted by the readable
                            </p>
                            <div className="icon-section d-flex">
                              <div className="icon">
                                <button
                                  className="btn btn-transparent"
                                  disabled={!isLogedIn}
                                >
                                  <i className="fas fa-thumbs-up" />{' '}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">&nbsp;</div>
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
    openModalPopUp: () => dispatch(openModalForRequest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetails);

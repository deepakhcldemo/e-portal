import React, { Component } from "react";
import Like from "../../shared/components/like/Like";
import Dislike from "../../shared/components/dislike/Dislike";
import {
  getCommentRating,
  saveTeacherRating,
  saveLike
} from "../../database/dal/firebase/commentDal";

class CommentLikeUnlike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: 0,
      dislike: 0,
      userLike: 0,
      userRating: {}
    };
  }

  componentDidMount() {
    this.props.setSpinnerStatus(true);
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    this.user = user;
  }

  handleRating(commentId, user, nextValue, onComponentLoad) {
    getCommentRating(commentId).then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const ratings = data.ratings;
        const nOfUser = ratings.length;
        this.setState({ userRating: data });

        if (nOfUser > 0) {
          let totalRating = this.getTotalRating(ratings, nOfUser);
          if (user) {
            const userId = user.user.uid;
            let currentUser = ratings.filter(user => user.userId === userId)[0];

            if (onComponentLoad) {
              if (!currentUser) {
                currentUser = {
                  userId: userId,
                  like: 0,
                  dislike: 0,
                  rating: 0
                };
                ratings.push(currentUser);
              }
              data.rating = totalRating;

              if (this.state.teacherDetails.hasOwnProperty("rating")) {
                this.state.teacherDetails.rating = totalRating;
              }
              if (this.state.teacherDetails.hasOwnProperty("noOfRatings")) {
                this.state.teacherDetails.noOfRatings = this.handleNofUserRated(
                  ratings
                );
              }

              saveTeacherRating(commentId, data);
              // saveTeacherRatingOnProfile(commentId, this.state.teacherDetails);

              console.log(
                "this.state.userRating.ratings",
                this.state.userRating.ratings
              );
              this.setState({
                starRating: Math.round(currentUser.rating),
                like: this.getTotalLike(this.state.userRating.ratings),
                dislike: this.getTotalDislike(this.state.userRating.ratings),
                userLike: currentUser.like,
                userDislike: currentUser.dislike
              });
            } else {
              let newUser = { userId: "0", like: 0, dislike: 0, rating: 0 };
              if (currentUser) {
                currentUser.rating = nextValue;
              } else {
                newUser.userId = userId;
                currentUser = newUser;
                ratings.push(currentUser);
              }
              data.rating = totalRating;
              if (this.state.teacherDetails.hasOwnProperty("rating")) {
                this.state.teacherDetails.rating = totalRating;
              }
              if (this.state.teacherDetails.hasOwnProperty("noOfRatings")) {
                this.state.teacherDetails.noOfRatings = this.handleNofUserRated(
                  ratings
                );
              }
              saveTeacherRating(commentId, data);
              // saveTeacherRatingOnProfile(commentId, this.state.teacherDetails);

              this.setState({ starRating: nextValue });
            }
          }
        } else {
          if (user) {
            const userId = user.user.uid;
            let currentUser = ratings.filter(user => user.userId === userId)[0];
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
            let totalRating = this.getTotalRating(ratings, nOfUser);
            data.rating = totalRating;

            saveTeacherRating(commentId, data);
            this.setState({ starRating: nextValue });
          }
        }
      }
    });
  }
  /* Like Dislike */
  handleLikeDislike = (commentId, currentButton) => {
    if (this.user) {
      const userId = this.user.user.uid;
      // const commentId = this.props.match.params.id;
      const { userRating } = this.state;
      let currentUser = userRating.ratings.filter(
        user => user.userId === userId
      )[0];
      if (currentButton === "like") {
        // toggle like
        currentUser.like = currentUser.like ? 0 : 1;
        if (currentUser.dislike > 0) {
          currentUser.dislike = currentUser.dislike - 1;
        }

        const userRating = {
          feedbackby: [
            {
              like: 1,
              unlike: 0,
              userId: userId
            }
          ]
        };

        saveLike(commentId, userRating).then(success => {
          this.setState({
            like: this.getTotalLike(userRating.ratings),
            dislike: this.getTotalDislike(userRating.ratings),
            userLike: currentUser.like,
            userDislike: currentUser.dislike
          });
        });
      } else if (currentButton === "dislike") {
        currentUser.dislike = currentUser.dislike ? 0 : 1;
        // currentUser.like = currentUser.like ? 0 : 1;
        if (currentUser.like > 0) {
          currentUser.like = currentUser.like - 1;
        }

        // console.log('dislike', currentUser);
        saveLike(commentId, userRating).then(success => {
          this.setState({
            like: this.getTotalLike(userRating.ratings),
            dislike: this.getTotalDislike(userRating.ratings),
            userLike: currentUser.like,
            userDislike: currentUser.dislike
          });
        });
      }
    }
  };

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
    return Math.round(totalRating);
  }

  getTotalLike(ratings) {
    const totalLikedObj = ratings.filter(user => user.like === 1);
    return totalLikedObj.length;
  }

  getTotalDislike(ratings) {
    const totalDislikeObj = ratings.filter(user => user.dislike === 1);
    return totalDislikeObj.length;
  }

  render() {
    const { like, userLike, userDislike, dislike } = this.state;
    const { feedbackId } = this.props;

    const isLogedIn = localStorage.getItem("user");
    return (
      <div className="icon-section d-flex">
        <div className="icon">
          <Like
            isDisabled={!isLogedIn}
            userLike={userLike}
            totalLike={like}
            onLike={e => this.handleLikeDislike(feedbackId, "like")}
          />
        </div>
        <div className="icon">
          <Dislike
            isDisabled={!isLogedIn}
            userDislike={userDislike}
            totalDislike={dislike}
            onDislike={e => this.handleLikeDislike(feedbackId, "dislike")}
          />
        </div>
        <div className="icon">
          <button className="btn btn-transparent" disabled={!isLogedIn}>
            <i className="fas fa-comment-alt" />
          </button>
        </div>
      </div>
    );
  }
}

export default CommentLikeUnlike;

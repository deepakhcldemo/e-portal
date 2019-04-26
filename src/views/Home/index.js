import React, { Component } from 'react';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';
import CategoryItem from '../CategoryItem';
import {
  getBannerFromDB,
  getCurriculumFromDB,
  getTeacherFromDB,
  getFeedbackFromDB,
  getUserProfileFromDB
} from './../../database/dal/firebase/homeDal';
import TopTutor from '../../components/topTutor/TopTutor';
import * as actionTypes from '../../spinnerStore/actions';
import RecentVideo from '../../components/recentVideo/RecentVideo';
import StudentFeedback from '../../components/studentFeedback/StudentFeedback';
import Banner from '../../components/banner/Banner';
import GLOBAL_VARIABLES from '../../config/config';
// import { zipRequestDispatch } from '../../shared/library/ZipcodesByRadius';

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.setSpinnerStatus(true);
    this.state = {
      bannerRows: [],
      carouselTop10Items: [],
      carousellistNewlyItems: [],
      studentsReview: []
    };
  }

  componentWillUnmount() {
    this.setState({
      bannerRows: [],
      carouselTop10Items: [],
      carousellistNewlyItems: [],
      studentsReview: []
    });
  }

  componentDidMount = () => {
    getBannerFromDB().onSnapshot(querySnapshot => {
      let bannerData = [];
      querySnapshot.forEach(doc => {
        bannerData.push(doc.data());
      });
      this.setState({
        bannerRows: bannerData
      });
    });

    getTeacherFromDB().onSnapshot(querySnapshot => {
      let teacherData = [];
      querySnapshot.forEach(doc => {
        teacherData.push(doc.data());
      });
      this.setState({
        carouselTop10Items: teacherData
      });
      teacherData = [];
    });

    getCurriculumFromDB().onSnapshot(querySnapshot => {
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

    getFeedbackFromDB().onSnapshot(querySnapshot => {
      // let profileData = [];
      let tempArr = {};
      let feedbackData = [];
      querySnapshot.forEach(doc => {
        if (doc.exists) {
          if (doc.data().user_id) {
            getUserProfileFromDB(doc.data().user_id).onSnapshot(
              querySnapshot => {
                querySnapshot.forEach(profileData => {
                  tempArr['profileData'] = profileData.data();
                  tempArr['feedback'] = doc.data();

                  feedbackData.push(tempArr);
                  this.setState({
                    studentsReview: feedbackData
                  });
                  tempArr = {};
                });
                this.props.setSpinnerStatus(false);
              },
              error => {
                this.props.setSpinnerStatus(false);
              }
            );
          }
        }
      });
    });
  };

  render() {
    const {
      bannerRows,
      carouselTop10Items,
      carousellistNewlyItems,
      studentsReview
    } = this.state;

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <HeaderHome headeTitle="Dashboard" />
            </div>
          </div>
          <div className="content-container">
            {bannerRows.length > 0 && (
              <Banner bannerRows={bannerRows} pageName="home" />
            )}

            {carouselTop10Items.length > 0 && (
              <TopTutor
                carouselTop10Items={carouselTop10Items}
                headeTitle={GLOBAL_VARIABLES.TOP10_TUTOR}
              />
            )}

            {carousellistNewlyItems.length > 0 && (
              <RecentVideo
                carousellistNewlyItems={carousellistNewlyItems}
                headeTitle={GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS}
              />
            )}

            {studentsReview.length > 0 && (
              <StudentFeedback
                studentsReview={studentsReview}
                headeTitle={GLOBAL_VARIABLES.STUDENTS_REVIEW}
              />
            )}

            <CategoryItem />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

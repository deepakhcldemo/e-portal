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
    const online = window.navigator.onLine;
    if (online) {
      getBannerFromDB().onSnapshot(querySnapshot => {
        let bannerData = [];
        querySnapshot.forEach(doc => {
          bannerData.push(doc.data());
        });
        this.setState({
          bannerRows: bannerData
        });
      });
    } else {
      const bannerData = [
        { banner_image: 'business-banner-1600x300.jpg', page: 'home' },
        { banner_image: 'student_banner.jpg', page: 'home' }
      ];

      this.setState({
        bannerRows: bannerData
      });
    }

    getTeacherFromDB().onSnapshot(querySnapshot => {
      if (querySnapshot.empty) {
        this.props.setSpinnerStatus(false);
        return;
      }
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
      if (querySnapshot.empty) {
        this.props.setSpinnerStatus(false);
        return;
      }
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
      if (querySnapshot.empty) {
        this.props.setSpinnerStatus(false);
        return;
      }
      querySnapshot.forEach(doc => {
        const user_id = doc.data().user_id;
        if (user_id) {
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
        } else {
          this.props.setSpinnerStatus(false);
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

    // console.log('--bannerData--', bannerRows, '-----', window.navigator.onLine);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <HeaderHome headeTitle="Dashboard" />
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

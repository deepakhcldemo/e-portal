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
import RecentVideo from '../../components/recentVideo/RecentVideo';
import StudentFeedback from '../../components/studentFeedback/StudentFeedback';
import Banner from '../../components/banner/Banner';
import GLOBAL_VARIABLES from '../../config/config';
import { zipRequestDispatch } from '../../shared/library/ZipcodesByRadius';

class Home extends Component {
  constructor(props) {
    super(props);
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
        getUserProfileFromDB(doc.data().user_id).onSnapshot(querySnapshot => {
          querySnapshot.forEach(profileData => {
            tempArr['profileData'] = profileData.data();
            tempArr['feedback'] = doc.data();

            feedbackData.push(tempArr);
            this.setState({
              studentsReview: feedbackData
            });
            tempArr = {};
          });
        });
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
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12 container--margin-bottom">
            <HeaderHome headeTitle="Dashboard" />
          </div>
        </div>

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

        <div className="col-12 content-container--background">&npsp;</div>
        <div className="col-12 content-container--background">&nbsp;</div>
        <div className="col-12 content-container--background">&nbsp;</div>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onSubmit: componentState => {

//       dispatch(
//         loginAction.loginRequestDispatch({
//           userName: componentState.username,
//           password: componentState.password
//         })
//       );
//     },    
//   };
// };

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

import React, { Component } from 'react';
// import ModalPopUp from "../../shared/components/modalpopup/modalpopup";
import CategoryItem from '../CategoryItem';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';
import Navbar from './../../shared/components/Navbar';
// import SearchTeacher from "./SearchTeacher/SearchTeacher";
import RecentVideo from '../../components/recentVideo/RecentVideo';
// import GLOBAL_VARIABLES from "../../config/config";
//import Navigation from './Navigation/Navigation';
// import Slider from "../../components/slider/Slider";
import { getTeacher, getCurriculum, /* getNotification */ } from './action';
import { getBannerFromDB } from '../../database/dal/firebase/studentDal';
import { getTeacherFromDB } from './../../database/dal/firebase/homeDal';
import Banner from '../../components/banner/Banner';
import TopTutor from '../../components/topTutor/TopTutor';
import GLOBAL_VARIABLES from '../../config/config';
import './Student.css';
// import TimePicker from 'react-bootstrap-time-picker';
class Student extends Component {
  constructor(props) {
    super(props);
    //this.teacherDetails = this.teacherDetails.bind(this);
    this.state = {
      selectedOption: null,
      bannerRows: [],
      carouselTop10Items: []
    };
  }

  componentDidMount() {
   // this.props.getNotification();
    getBannerFromDB().then(querySnapshot => {
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
  }

  render() {
    const { bannerRows, carouselTop10Items } = this.state;
    const { teacherCarouselRows, notifications } = this.props;
    console.log('notifications', notifications);
    const listTop10Items = teacherCarouselRows;
    console.log('listTop10Items', listTop10Items);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 container--margin-bottom">
            <HeaderHome
              headeTitle="Student Dashboard"
            />
          </div>
        </div>

        {bannerRows.length > 0 && (
          <Banner bannerRows={bannerRows} pageName="student" />
        )}
        <CategoryItem />
        {/* <div className="student-notification">

                </div> */}

        {carouselTop10Items.length > 0 && (
          <TopTutor
            carouselTop10Items={carouselTop10Items}
            headeTitle={GLOBAL_VARIABLES.TOP10_TUTOR}
          />
        )}

        <RecentVideo
          isNotVisibleVideoMeta={true}
          carousellistNewlyItems={notifications}
          headeTitle="Video Pending For Review"
        />

        <RecentVideo
          isNotVisibleVideoMeta={true}
          carousellistNewlyItems={notifications}
          headeTitle="Video Reviewed"
        />

        <div className="col-12 content-container--background">&nbsp;</div>
        <div className="col-12 content-container--background">&nbsp;</div>
        <Navbar />

        {/* <RecentVideo
          carousellistNewlyItems={notifications}
          title="Video Reviewed"
        />

        <Navbar links={STUDENT_DASHBOARD_LINKS} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    carouselRows: state.homeReducerStore.carouselData,
    teacherCarouselRows: state.homeReducerStore.teacherCarouselData,
    notifications: state.studentReducer.notificationData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurriculum: () => dispatch(getCurriculum()),
    getTeacher: () => dispatch(getTeacher()),
    //getNotification: () => dispatch(getNotification())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);

import React, { Component } from "react";
import CategoryItem from "../CategoryItem";
import HeaderHome from "../../components/layout/header/HeaderHome";
import { connect } from "react-redux";
import RecentVideo from "../../components/recentVideo/RecentVideo";
import { getTeacher, getCurriculum /* getNotification */ } from "./action";
import { getBannerFromDB } from "../../database/dal/firebase/studentDal";
import { getTeacherFromDB } from "./../../database/dal/firebase/homeDal";
import Banner from "../../components/banner/Banner";
import TopTutor from "../../components/topTutor/TopTutor";
import GLOBAL_VARIABLES from "../../config/config";
import "./Student.css";
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
    console.log("notifications", notifications);
    const listTop10Items = teacherCarouselRows;
    console.log("listTop10Items", listTop10Items);

    return (
      <div className="container-fluid">
        <HeaderHome headeTitle="Student Dashboard" />

        <div className="content-container">
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

          <div className="col-12 content-container--background">&nbsp;</div>
          <div className="col-12 content-container--background">&nbsp;</div>
          <RecentVideo
            isNotVisibleVideoMeta={true}
            carousellistNewlyItems={notifications}
            headeTitle="Video Reviewed"
          />
        </div>
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
    getTeacher: () => dispatch(getTeacher())
    //getNotification: () => dispatch(getNotification())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);

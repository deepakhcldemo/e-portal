import React, { Component } from "react";
import HeaderHome from "../../components/layout/header/HeaderHome";
import Navbar from "./../../shared/components/Navbar";
// import NavBar from './../../shared/components/Navbar/index'
// import UserList from "./UserList/UserList";
// import TopVideo from "./TopVideo/TopVideo";
// import GLOBAL_VARIABLES from "../../config/config";
// import Slider from "../../components/slider/Slider";
import Banner from "../../components/banner/Banner";
import RecentVideo from "../../components/recentVideo/RecentVideo";
import {
  getBannerFromDB,
  getCurriculumFromDB,
  getReviewContentFromDB
} from "./../../database/dal/firebase/curriculumDal";

import "./teacher.scss";

class Teacher extends Component {
  state = {
    userDetails: "",
    bannerData: "",
    myContent: [],
    reviewedContent: [],
    pendingContent: []
  };

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userProfile"))
    });
  };
  componentDidMount = () => {
    getBannerFromDB().then(querySnapshot => {
      let bannerData = [];
      querySnapshot.forEach(doc => {
        bannerData.push(doc.data());
      });
      this.setState({ bannerData });
    });

    getCurriculumFromDB(this.state.userDetails.userId).onSnapshot(
      querySnapshot => {
        let myContent = [];
        querySnapshot.forEach(doc => {
          myContent.push(doc.data());
        });
        this.setState({ myContent });
      }
    );
    this.getReviewContent(
      this.state.userDetails.userId,
      true,
      "reviewedContent"
    );
    this.getReviewContent(
      this.state.userDetails.userId,
      true,
      "pendingContent"
    );
  };

  getReviewContent = (userId, status, state) => {
    getReviewContentFromDB(userId, status).onSnapshot(querySnapshot => {
      let content = [];
      querySnapshot.forEach(doc => {
        content.push(doc.data());
      });
      this.setState({ [state]: content });
    });
  };

  render = () => {
    const {
      bannerData,
      myContent,
      reviewedContent,
      pendingContent
    } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <HeaderHome
              headeTitle="Teacher Dashboard"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 main-wrapper">
              {bannerData && (
                <Banner bannerRows={bannerData} pageName="teacher" />
              )}
              <RecentVideo
                isNotVisibleVideoMeta={true}
                carousellistNewlyItems={pendingContent}
                headeTitle="Video Pending for Review"
              />
              <RecentVideo
                isNotVisibleVideoMeta={true}
                carousellistNewlyItems={reviewedContent}
                headeTitle="Video Reviewed"
              />
              <RecentVideo
                carousellistNewlyItems={myContent}
                headeTitle="My Video"
              />
          </div>
        </div>        
        <div className="row main-wrapper">
          <Navbar />
        </div>
      </div>
    );
  };
}
export default Teacher;

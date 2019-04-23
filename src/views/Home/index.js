import React, { Component } from "react";
import HeaderHome from "../../components/layout/header/HeaderHome";
import { connect } from "react-redux";
import CategoryItem from "../CategoryItem";
import {
  getBannerFromDB,
  getCurriculumFromDB,
  getTeacherFromDB,
  getFeedbackFromDB,
  getUserProfileFromDB
} from "./../../database/dal/firebase/homeDal";
import TopTutor from "../../components/topTutor/TopTutor";
import RecentVideo from "../../components/recentVideo/RecentVideo";
import StudentFeedback from "../../components/studentFeedback/StudentFeedback";
import Banner from "../../components/banner/Banner";
import GLOBAL_VARIABLES from "../../config/config";

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

  componentDidMount = () => {
    getBannerFromDB().then(querySnapshot => {
      let bannerData = [];
      querySnapshot.forEach(doc => {
        bannerData.push(doc.data());
      });
      this.setState({
        bannerRows: bannerData
      });
    });

    getTeacherFromDB().then(querySnapshot => {
      let techerData = [];
      querySnapshot.forEach(doc => {
        techerData.push(doc.data());
      });
      this.setState({
        carouselTop10Items: techerData
      });
    });

    getCurriculumFromDB().then(querySnapshot => {
      let currData = [];
      querySnapshot.forEach(doc => {
        currData.push(doc.data());
      });

      if (currData.length > 0) {
        this.setState({
          carousellistNewlyItems: currData
        });
      }
    });

    getFeedbackFromDB().then(querySnapshot => {
      // let profileData = [];
      let tempArr = {};
      let feedbackData = [];
      querySnapshot.forEach(doc => {
        getUserProfileFromDB(doc.data().user_id).then(querySnapshot => {
          querySnapshot.forEach(profileData => {
            tempArr["profileData"] = profileData.data();
            tempArr["feedback"] = doc.data();

            feedbackData.push(tempArr);
            this.setState({
              studentsReview: feedbackData
            });
            tempArr = {};
          });
        });
      });

      // feedbackData.push(tempArr);
      // console.log('--querySnapshot--', this.state.studentsReview);
    });
  };

  render() {
    // const studentsReview = [
    //   {
    //     name: "Borivoje",
    //     profileImage:
    //       "https://i.pinimg.com/originals/35/5d/65/355d65da2e1dc28b3399951765bc5fb1.jpg",
    //     comment:
    //       "This plateform is a life saver. I dont have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I am really close."
    //   },
    //   {
    //     name: "Diana Hayden",
    //     profileImage:
    //       "http://nrsinstitute.com/wp-content/uploads/2014/05/edu-oatcert.jpg",
    //     comment:
    //       "I believe in lifelong learning and it is a great place to learn from experts. I have learned a lot and recommend it to all my friends."
    //   },
    //   {
    //     name: "Ria Hazal",
    //     profileImage:
    //       "https://media.gq.com/photos/5c115439a15f8517197598ac/16:9/w_1280%2Cc_limit/america-school-Teacher-guns-GQ.jpg",
    //     comment:
    //       "The courses are fantastic and the instructors are so fun and knowledgeable. I only wish we found it sooner"
    //   },
    //   {
    //     name: "Diana Hayden",
    //     profileImage:
    //       "http://nrsinstitute.com/wp-content/uploads/2014/05/edu-oatcert.jpg",
    //     comment:
    //       "I believe in lifelong learning and it is a great place to learn from experts. I have learned a lot and recommend it to all my friends."
    //   },
    //   {
    //     name: "Ria Hazal",
    //     profileImage:
    //       "https://media.gq.com/photos/5c115439a15f8517197598ac/16:9/w_1280%2Cc_limit/america-school-Teacher-guns-GQ.jpg",
    //     comment:
    //       "The courses are fantastic and the instructors are so fun and knowledgeable. I only wish we found it sooner"
    //   }
    // ];

    const {
      bannerRows,
      carouselTop10Items,
      carousellistNewlyItems,
      studentsReview
    } = this.state;

    // console.log("--studentsReview--", studentsReview);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 container--margin-bottom">
            <HeaderHome headeTitle="Dashboard" />
          </div>
        </div>

        {bannerRows.length > 0 && <Banner bannerRows={bannerRows} />}

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

        <div className="col-12 content-container--background">&nbsp;</div>
        <div className="col-12 content-container--background">&nbsp;</div>
      </div>
    );
  }
}
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

import React, { Component } from 'react';
import ModalPopUp from '../../shared/components/modalpopup/modalpopup';
import CategoryItem from '../CategoryItem';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';
import Navbar from './../../shared/components/Navbar';
import SearchTeacher from './SearchTeacher/SearchTeacher';
import RecentVideo from '../../components/recentVideo/RecentVideo';
import GLOBAL_VARIABLES from '../../config/config';
import { STUDENT_DASHBOARD_LINKS } from './../../constant/Constant';
//import Navigation from './Navigation/Navigation';
import Slider from '../../components/slider/Slider';
import { getTeacher, getCurriculum, getNotification } from './action';
import { getBannerFromDB } from '../../database/dal/firebase/studentDal';
import Banner from '../../components/banner/Banner';
import './Student.css';
// import TimePicker from 'react-bootstrap-time-picker';
class Student extends Component {
  constructor(props) {
    super(props);
    //this.teacherDetails = this.teacherDetails.bind(this);
    this.state = {
      selectedOption: null,
      bannerRows: []
    };
  }

  componentDidMount() {
    this.props.getNotification();
    getBannerFromDB().then(querySnapshot => {
      let bannerData = [];
      querySnapshot.forEach(doc => {
        bannerData.push(doc.data());
      });
      this.setState({
        bannerRows: bannerData
      });
    });
  }

  render() {
    const { bannerRows } = this.state;
    const { carouselRows, teacherCarouselRows, notifications } = this.props;

    console.log('notifications', notifications);
    const listTop10Items = teacherCarouselRows;
    console.log('listTop10Items', listTop10Items);
    let listNewlyItems = carouselRows;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <HeaderHome
              headeTitle="Student Dashboard"
              dashboardLinks={STUDENT_DASHBOARD_LINKS}
            />
          </div>
        </div>

        {bannerRows.length > 0 && <Banner bannerRows={bannerRows} />}
        <CategoryItem />
        {/* <div className="student-notification">

                </div> */}
               
                    <RecentVideo carousellistNewlyItems={notifications} headeTitle="Video Pending For Review"></RecentVideo>
                

                
                    <RecentVideo carousellistNewlyItems={notifications} headeTitle="Video Reviewed"></RecentVideo>
                
                
                    
               
                <Navbar links={STUDENT_DASHBOARD_LINKS} />

        <RecentVideo
          carousellistNewlyItems={notifications}
          title="Video Reviewed"
        />

        <Navbar links={STUDENT_DASHBOARD_LINKS} />
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
    getNotification: () => dispatch(getNotification())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);

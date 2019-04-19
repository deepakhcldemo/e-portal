import React, { Component } from 'react';
import ModalPopUp from '../../shared/components/modalpopup/modalpopup'
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from "react-redux";
import Navbar from './../../shared/components/Navbar';
import SearchTeacher from './SearchTeacher/SearchTeacher';
import RecentVideo from '../../components/recentVideo/RecentVideo';
import GLOBAL_VARIABLES from '../../config/config';
import { STUDENT_DASHBOARD_LINKS } from './../../constant/Constant'
//import Navigation from './Navigation/Navigation';
import Slider from '../../components/slider/Slider';
import { getTeacher, getCurriculum , getNotification } from './action';
import {getBannerFromDB} from '../../database/dal/firebase/studentDal'
import Banner from '../../components/banner/Banner';
import './Student.css';
// import TimePicker from 'react-bootstrap-time-picker';
class Student extends Component {
    constructor(props) {
        super(props);
        //this.teacherDetails = this.teacherDetails.bind(this);
        this.state = {
            selectedOption: null,
            bannerRows: [],
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
        const {bannerRows}  = this.state;
        const { carouselRows, teacherCarouselRows , notifications } = this.props;
        debugger
        console.log('notifications', notifications);
        const listTop10Items = teacherCarouselRows;
        console.log('listTop10Items', listTop10Items);
        let listNewlyItems = carouselRows;
        return (
            <div>
                <HeaderHome headeTitle="Student Dashboard" dashboardLinks={STUDENT_DASHBOARD_LINKS}/>
                <div>
                {bannerRows.length > 0 && <Banner bannerRows={bannerRows} />}
                </div>
                <div className="student-notification">

                </div>
                <div className="student-tutor">
                <RecentVideo carousellistNewlyItems={notifications}  title = "Video For Review"></RecentVideo>
                </div>

                <div className="student-tutor rm-mrgn">
                    <Slider listNewlyItems={listNewlyItems}>
                        <h3 className="mt-30">{GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS} <i className="fas fa-chevron-right"></i></h3>
                    </Slider>
                </div>
                <Navbar links={STUDENT_DASHBOARD_LINKS}/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        carouselRows: state.homeReducerStore.carouselData,
        teacherCarouselRows: state.homeReducerStore.teacherCarouselData,
        notifications : state.studentReducer.notificationData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurriculum: () => dispatch(getCurriculum()),
        getTeacher: () => dispatch(getTeacher()),
        getNotification : () => dispatch(getNotification())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Student);



import React, { Component } from 'react'
import HeaderHome from '../../components/layout/header/HeaderHome';
import Navbar from './../../shared/components/Navbar'
// import NavBar from './../../shared/components/Navbar/index'
import UserList from './UserList/UserList'
import TopVideo from './TopVideo/TopVideo'
import { TEACHER_DASHBOARD_LINKS } from './../../constant/Constant'
import GLOBAL_VARIABLES from '../../config/config';
import Slider from '../../components/slider/Slider';
import Banner from '../../components/banner/Banner';
import RecentVideo from '../../components/recentVideo/RecentVideo';
import {
    getBannerFromDB,
    getCurriculumFromDB,
    getNotificationFromDB
} from './../../database/dal/firebase/curriculumDal';

import './teacher.scss'

const userList = [
    {
        uid: 'sdfdf',
        img: '',
        name: 'varun',
        desc: 'Brunch this weekend',
        notification: 'Brunch this weekend'
    }
]
class Teacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerRows: [],
            carousellistNewlyItems: []
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

    };

    render = () => {
        const {
            bannerRows,
            carousellistNewlyItems
        } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 container--margin-bottom">
                        <HeaderHome headeTitle="Teacher Dashboard" dashboardLinks={TEACHER_DASHBOARD_LINKS} />
                    </div>
                </div>

                {bannerRows.length > 0 && <Banner bannerRows={bannerRows} />}

                {carousellistNewlyItems.length > 0 && (
                    <RecentVideo carousellistNewlyItems={carousellistNewlyItems} headeTitle="Video Pending for Review" />
                )}

                {carousellistNewlyItems.length > 0 && (
                    <RecentVideo carousellistNewlyItems={carousellistNewlyItems} headeTitle="Video Reviewed" />
                )}

                {carousellistNewlyItems.length > 0 && (
                    <RecentVideo carousellistNewlyItems={carousellistNewlyItems} headeTitle="My Video" />
                )}
                <div className="col-12 content-container--background">&nbsp;</div>
                <div className="col-12 content-container--background">&nbsp;</div>
                {/* <div className="row">
                    <div className="col-12 main-wrapper">
                       
                        <UserList heading="Students List" userList={userList} />
                        <TopVideo heading="Top 10 Videos" videoDetails={videoDetails} />
                    </div>
                </div>
                */}
                <div className="col-12">
                    <Navbar links={TEACHER_DASHBOARD_LINKS} />
                </div> 
            </div>
        );
    }
}
export default Teacher


import React, { Component } from 'react'
import HeaderHome from '../../components/layout/header/HeaderHome';
import Navbar from './../../shared/components/Navbar'
// import NavBar from './../../shared/components/Navbar/index'
import UserList from './UserList/UserList'
import TopVideo from './TopVideo/TopVideo'
import { TEACHER_DASHBOARD_LINKS } from './../../constant/Constant'
import GLOBAL_VARIABLES from '../../config/config';
import Slider from '../../components/slider/Slider';

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
const videoDetails = [
    {
        link: '',
        title: 'sample video',
        alt: 'sample video',
        img: 'https://i1.wp.com/www.topcompares.com/wp-content/uploads/2018/09/top-5-video-editor-apps-for-android-2018-1.jpg?resize=640%2C411&ssl=1',
        name: 'Sample video',
        duration: '01:00'
    },
    {
        link: '',
        title: 'sample video',
        alt: 'sample video',
        img: 'https://i1.wp.com/www.topcompares.com/wp-content/uploads/2018/09/top-5-video-editor-apps-for-android-2018-1.jpg?resize=640%2C411&ssl=1',
        name: 'Sample video',
        duration: '01:00'
    },
    {
        link: '',
        title: 'sample video',
        alt: 'sample video',
        img: 'https://i1.wp.com/www.topcompares.com/wp-content/uploads/2018/09/top-5-video-editor-apps-for-android-2018-1.jpg?resize=640%2C411&ssl=1',
        name: 'Sample video',
        duration: '01:00'
    },
    {
        link: '',
        title: 'sample video',
        alt: 'sample video',
        img: 'https://i1.wp.com/www.topcompares.com/wp-content/uploads/2018/09/top-5-video-editor-apps-for-android-2018-1.jpg?resize=640%2C411&ssl=1',
        name: 'Sample video',
        duration: '01:00'
    },
    {
        link: '',
        title: 'sample video',
        alt: 'sample video',
        img: 'https://i1.wp.com/www.topcompares.com/wp-content/uploads/2018/09/top-5-video-editor-apps-for-android-2018-1.jpg?resize=640%2C411&ssl=1',
        name: 'Sample video',
        duration: '01:00'
    },
    {
        link: '',
        title: 'sample video',
        alt: 'sample video',
        img: 'https://i1.wp.com/www.topcompares.com/wp-content/uploads/2018/09/top-5-video-editor-apps-for-android-2018-1.jpg?resize=640%2C411&ssl=1',
        name: 'Sample video',
        duration: '01:00'
    },
    {
        link: '',
        title: 'sample video',
        alt: 'sample video',
        img: 'https://i1.wp.com/www.topcompares.com/wp-content/uploads/2018/09/top-5-video-editor-apps-for-android-2018-1.jpg?resize=640%2C411&ssl=1',
        name: 'Sample video',
        duration: '01:00'
    }
]
class Teacher extends Component {
    render = () => {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <HeaderHome headeTitle="Teacher Dashboard" dashboardLinks={TEACHER_DASHBOARD_LINKS}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 main-wrapper"> 
                        {/* <Slider listNewlyItems={listNewlyItems}>
                            <h3 className="mt-30">{GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS} <i className="fas fa-chevron-right"></i></h3>
                        </Slider>  */}             
                        <UserList heading="Students List" userList={userList} />   
                        <TopVideo heading="Top 10 Videos" videoDetails={videoDetails} />
                    </div>
                </div>
                <div className="row">
                    <Navbar links={TEACHER_DASHBOARD_LINKS}/>
                </div>
            </div>
        );
    }
}
export default Teacher

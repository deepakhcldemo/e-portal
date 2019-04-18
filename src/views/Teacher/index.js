import React, { Component } from 'react'
import NavBar from './Navbar/index'
import UserList from './UserList/UserList'
import TopVideo from './TopVideo/TopVideo'
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
                <NavBar/>
                <div className="row margin-bottom">                                    
                    <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                        <UserList heading="Students List" userList={userList} />   
                    </div>
                    <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                        <TopVideo heading="Top 10 Videos" videoDetails={videoDetails} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Teacher

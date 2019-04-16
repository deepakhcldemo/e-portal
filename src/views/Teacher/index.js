import React, { Component } from 'react'
import NavBar from './Navbar/index'
import UserList from './UserList/UserList'
import TopVideo from './TopVideo/TopVideo'
import './styles.scss'

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
        img: 'http://i.ytimg.com/vi/ZKOtE9DOwGE/mqdefault.jpg',
        name: 'Sample video',
        duration: '01:00'
    }
]
class Teacher extends Component {
    render = () => {
        return (
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="col-12 col-md-12 col-xl-12 padding-zero">
                        <NavBar/>
                    </div>
                </div>
                <div className="row margin-top">                                    
                    <div className="col-sm-12 col-md-12 col-lg-6 pull-left">
                        <UserList heading="Review Students" subHeading="Students List" userList={userList} />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 pull-left">
                        <TopVideo heading="Top 10 Videos" videoDetails={videoDetails} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Teacher

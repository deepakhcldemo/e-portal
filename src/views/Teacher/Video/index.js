import React, { Component } from 'react'
import {connect} from 'react-redux'
import Modal from 'react-responsive-modal'
import { TEACHER_DASHBOARD_LINKS } from './../../../constant/Constant'
import HeaderHome from '../../../components/layout/header/HeaderHome';
import Navbar from './../../../shared/components/Navbar'
//import NavBar from './../../../shared/components/Navbar/index'
import TopVideo from './../TopVideo/TopVideo'
import Curriculum from './../../Curriculum/index'
import { openModal, closeModal } from './action'

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
class Video extends Component {
    render = () => {
        const styles = {
            modal: {
                width: '100%',
                minHeight: '70%'
            }
        }
        const { modalState } = this.props
        return (
            <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <HeaderHome headeTitle="Teacher Dashboard" dashboardLinks={TEACHER_DASHBOARD_LINKS}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 main-wrapper"> 
                        <TopVideo heading="My Videos" videoDetails={videoDetails}>
                            <button onClick={this.props.openModal} className="btn home-header-text-link-status" title="Upload Video"><i className="fas fa-plus"></i> Add Video</button>
                        </TopVideo>
                    </div>
                </div>
                <div className="row">
                    <Navbar links={TEACHER_DASHBOARD_LINKS}/>
                </div>
            </div>
            <Modal open={modalState} onClose={this.props.closeModal} center styles={styles}>                
                <Curriculum />                
            </Modal>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        modalState: state.category.openModal,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Video)

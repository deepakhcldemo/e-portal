import React, { Component } from 'react'
import {connect} from 'react-redux'
import Modal from 'react-responsive-modal'
import NavBar from './../Navbar/index'
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
                height: '70%'
            }
        }
        const { modalState } = this.props
        return (
            <>
            <div className="container-fluid">
                <NavBar/>
                <div className="row margin-bottom">                                                        
                    <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                        <TopVideo heading="My Videos" videoDetails={videoDetails}>
                            <button onClick={this.props.openModal} className="btn" title="Upload Video"><i className="fas fa-plus"></i> Add Video</button>
                        </TopVideo>
                    </div>
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

import React, { Component } from 'react'
import {connect} from 'react-redux'
import Modal from 'react-responsive-modal'
import { TEACHER_DASHBOARD_LINKS } from './../../../constant/Constant'
import HeaderHome from '../../../components/layout/header/HeaderHome';
import Navbar from './../../../shared/components/Navbar'
//import NavBar from './../../../shared/components/Navbar/index'
import TopVideo from './../TopVideo/TopVideo'
import Curriculum from './../../Curriculum/index'
import { openModal, closeModal, getContent } from './action'

class Video extends Component {

    componentDidMount = () => {
        this.props.getContent(JSON.parse(localStorage.getItem('userProfile')).userId)
    }

    render = () => {
        const styles = {
            modal: {
                width: '100%',
                minHeight: '70%'
            }
        }
        const { modalState, contentDetails } = this.props
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
                        <TopVideo heading="My Videos" videoDetails={contentDetails}>
                            <button onClick={this.props.openModal} className="btn home-header-text-link-status" title="Upload Video"><i className="fas fa-plus"></i> Add Video</button>
                        </TopVideo>
                    </div>
                </div>
                <div className="row">
                    <Navbar links={TEACHER_DASHBOARD_LINKS}/>
                </div>
            </div>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} open={modalState} onClose={this.props.closeModal} center styles={styles}>                
                <Curriculum />                
            </Modal>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        modalState: state.category.openModal,
        contentDetails: state.video.content
    }
}
const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
        getContent: (uid) => dispatch(getContent(uid))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Video)

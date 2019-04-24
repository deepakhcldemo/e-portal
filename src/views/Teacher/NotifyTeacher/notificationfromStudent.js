import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import NavBar from '../../../shared/components/Navbar'
import { getNotificationsFromDB } from "./../../../database/dal/firebase/studentDal";
import Modal from 'react-responsive-modal'

class NotificationFromStudent extends Component {


    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount = () => {
        getNotificationsFromDB().onSnapshot(querySnapshot => {
            let notifyData = [];
            querySnapshot.forEach(doc => {
                notifyData.push(doc.data());
            });

            if (notifyData.length > 0) {
                this.setState({
                    notificationslistNewlyItems: notifyData
                });
            }
            notifyData = [];
        });

    };
    render = () => {
        const { open } = this.state;
        const { notificationslistNewlyItems } = this.state;
        console.log('notificationslistNewlyItems', notificationslistNewlyItems);
        return (
            <>
                <div className="container-fluid">
                    <NavBar />
                    <div className="row margin-bottom">
                        <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4>Notification</h4><hr />


                                    <Link to={`/student/notificationFullDetails`} activeClassName="active">
                                        <div className="alert alert-info">
                                            <div style={{ float: "left" }}><img src="../Assets/hdpi/userProfile.png" name="aboutme" width="70" height="50" border="0" className="img-circle" alt="" /></div>
                                            <div className="container" onClick={this.onOpenModal} style={{ cursor: "pointer" }}>

                                                <div className="alert-icon">
                                                    <i className="material-icons">Student Kately</i>
                                                </div>
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true"><i className="material-icons">clear</i></span>
                                                </button>

                                                <b>Message:</b> You have new chat request from Kately. Please click to see..
                                        </div>
                                        </div>

                                    </Link>
                                    

                                    {/* <div className="alert alert-info">
                                        <div style={{ float: "left" }}><img src="../Assets/hdpi/userProfile.png" name="aboutme" width="70" height="50" border="0" className="img-circle" alt="" /></div>
                                        <div className="container">
                                            <div className="alert-icon">
                                                <i className="material-icons">Student Belly</i>
                                            </div>
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true"><i className="material-icons">clear</i></span>
                                            </button>

                                            <b>Message:</b> You have new chat request from Kately. Please click to see..
                                         </div>
                                    </div> */}



                                    <div>

                                        <Modal open={open} onClose={this.onCloseModal} center>
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 className="modal-title" id="myModalLabel">More About Joe Notification</h4>
                                                </div>
                                                <div className="modal-body">
                                                    <center>
                                                        <img src="../Assets/avatar.png" name="aboutme" width="140" height="140" border="0" className="img-circle" alt="" />
                                                        <h3 className="media-heading">Kately <small>USA</small></h3>
                                                    </center>
                                                    <span><strong>Date: </strong></span>
                                                    <span className="label label-warning">4/22/2019</span> &nbsp;
    
    
                                                    <span><strong>Timing: </strong></span>

                                                    <span className="label label-info">9:00 AM</span>

                                                    &nbsp;
    
    
                                                    <span><strong>Duration: </strong></span>

                                                    <span className="label label-info">30 Min</span>




                                                    <p className="text-left"><strong>Message: </strong>
                                                        Hey Michal, I just want a discssion on following topic. Please schedule a chat meeting. Waiting for you.</p>


                                                </div>
                                                <div className="modal-footer">

                                                    <button type="button" className="btn btn-success" data-dismiss="modal">Accept</button>

                                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Reject</button>

                                                    <button type="button" className="btn btn-warning" data-dismiss="modal">Discuss on Time</button>

                                                </div>
                                            </div>
                                        </Modal>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // getNotifications: () => dispatch(getNotifications()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationFromStudent);

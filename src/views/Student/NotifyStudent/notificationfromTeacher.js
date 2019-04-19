import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../../../shared/components/Navbar'

import Modal from 'react-responsive-modal'

class NotificationfromTeacher extends Component {


    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render = () => {
        const { open } = this.state;
        return (
            <>
                <div className="container-fluid">
                    <NavBar />
                    <div className="row margin-bottom">
                        <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4>Notifications</h4><hr />


                                    <Link to={`/Student/notificationFullDetails`} activeClassName="active">
                                        <div class="alert alert-success">
                                            <div style={{ float: "left" }}><img src="../Assets/hdpi/userProfile.png" name="aboutme" width="70" height="50" border="0" class="img-circle" /></div>
                                            <div class="container" onClick={this.onOpenModal} style={{ cursor: "pointer" }}>
                                                <div class="alert-icon">
                                                    <i class="material-icons">From Teacher John Cruz</i>
                                                </div>
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true"><i class="material-icons">clear</i></span>
                                                </button>

                                                <b>Message:</b> John has accepted your chat.Please pay for chat request....
                                        </div>
                                        </div>
                                    </Link>
                                    <div class="alert alert-danger">
                                        <div style={{ float: "left" }}><img src="../Assets/hdpi/userProfile.png" name="aboutme" width="70" height="50" border="0" class="img-circle" /></div>
                                        <div class="container">
                                            <div class="alert-icon">
                                                <i class="material-icons">From Teacher Ellena Dcruz</i>
                                            </div>
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true"><i class="material-icons">clear</i></span>
                                            </button>

                                            <b>Message:</b>Ellena Dcruz declined your chat offer. Please ask for other timing....
        </div>
                                    </div>



                                    <div>

                                        <Modal open={open} onClose={this.onCloseModal} center>
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title" id="myModalLabel">More About Notification</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <center>
                                                        <img src="../Assets/avatar.png" name="aboutme" width="140" height="140" border="0" class="img-circle" />
                                                        <h3 class="media-heading">John Cruz <small>USA</small></h3>
                                                    </center>
                                                    <span><strong>Date: </strong></span>
                                                    <span class="label label-warning">4/22/2019</span> &nbsp;


                                                    <span><strong>Timing: </strong></span>

                                                    <span class="label label-info">9:00 AM</span>

                                                    &nbsp;


                                                    <span><strong>Duration: </strong></span>

                                                    <span class="label label-info">30 Min</span>




                                                    <p class="text-left"><strong>Message: </strong>
                                                        Hey Kately, Good to see you. I have accepted your offer. Please pay for further process.</p>


                                                </div>
                                                <div class="modal-footer">

                                                    <button type="button" class="btn btn-success" data-dismiss="modal">Pay</button>



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
export default NotificationfromTeacher

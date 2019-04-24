import React, { Component } from 'react';
import NavBar from '../../../shared/components/Navbar'

class notificationsDescription extends Component {
    state = {}
    render() {
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="row margin-bottom">
                    <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                                        <h4 className="modal-title" id="myModalLabel">More About Joe Notification</h4>
                                    </div>
                                    <div className="modal-body">
                                        <center>
                                            <img alt="" src="../Assets/avatar.png" name="aboutme" width="140" height="140" border="0" className="img-circle" />
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
                                </div></div></div></div></div></div>);
    }
}

export default notificationsDescription;
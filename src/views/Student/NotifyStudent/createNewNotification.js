import React, { Component } from 'react';
import NavBar from '../../../shared/components/Navbar'

class CreateNewNotification extends Component {

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
            
                <div className="container-fluid">
                    <NavBar />
                    <div className="row margin-bottom">
                        <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4>Create Notification:</h4><hr />



                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
        );
    }
}

export default CreateNewNotification

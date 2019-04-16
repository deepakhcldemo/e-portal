import React, { Component } from 'react'
import NavBar from './../Navbar/index'

class Video extends Component {
    render = () => {
        return (
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="col-12 col-md-12 col-xl-12 padding-zero">
                        <NavBar/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h6>User List</h6>
                    </div>
                </div>
            </div>
        );
    }
}
export default Video

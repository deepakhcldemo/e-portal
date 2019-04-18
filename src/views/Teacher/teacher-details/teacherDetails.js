import React, { Component } from 'react';
import './teacherDetails.scss';
import { Link } from 'react-router-dom';

import HeaderHome from '../../../components/layout/header/HeaderHome';


class teacherDetails extends Component {
    componentDidMount(){
        console.log(localStorage.getItem('user'))
        console.log('this.props', this.props)
    }
    navigateToLogin(id) {
        localStorage.setItem('teacherDetailId', id)
    }
    moreDetails(isLogedIn) {
        if (isLogedIn) {
            return (
                <div>
                    More detail to be displayed
                </div>
            )
        }
        return (
            <button className="btn btn-primary" onClick={(e)=> this.navigateToLogin(1)}>Login to view more</button>
        )
    }
    render() {
        return (
            <div>
                <HeaderHome />
                <div className="container details-wrapper">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="media">
                                <img className="profile-img" src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg" alt="..." />
                                <div className="media-body">
                                    <h5 className="mt-0">Media heading</h5>
                                    <p>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                    </p>
                                    {this.moreDetails(localStorage.getItem('user'))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default teacherDetails;
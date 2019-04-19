import React, { Component } from 'react';
import './TeacherItem.css';

class TeacherItem extends Component {
  render() {
    const { userProfile } = this.props;
    return (
      <div className="card">
        <div className="card-body user-profile-card--padding">
          <div className="vd-wrapper  col-xs-12">
            <div
              style={{
                backgroundImage: `url( ${userProfile.profileImage} )`,
                backgroundPosition: 'top center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '200px',
                borderRadius: '100px'
              }}
              className="border_1px"
            />

            <div className="vd-content user-details--height">
              <h6>{userProfile.firstName + ' ' + userProfile.lastName}</h6>
              <p>Registered {userProfile.noOfDays} days ago.</p>
              <p>Subject: {userProfile.subject}</p>
              <p>Rating: {userProfile.rating ? userProfile.rating : 0}/5 </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherItem;

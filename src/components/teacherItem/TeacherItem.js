import React, { Component } from 'react';
import './TeacherItem.css';
import StarRatingComponent from 'react-star-rating-component';

class TeacherItem extends Component {
  setColClass = () => {};
  render() {
    const { userProfile, isTrayItem } = this.props;

    return (
      <div className="card">
        <div className="card-body user-profile-card--padding">
          <div className="vd-wrapper  col-xs-12">
            <div className="row row-without--margin">
              <div className={isTrayItem ? 'col-4' : 'col-12'}>
                <div
                  style={{
                    backgroundImage: `url( ${userProfile.profileImage} )`,
                    backgroundPosition: 'top center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '200px',
                    margin: '10px',
                    borderRadius: '100px'
                  }}
                  className="border_1px"
                />
              </div>
              <div className={isTrayItem ? 'col-6' : 'col-12'}>
                <div className="vd-content user-details--style">
                  <h6>{userProfile.firstName + ' ' + userProfile.lastName}</h6>
                  <p>
                    <strong>Subject:</strong> {userProfile.subject}
                  </p>
                  {isTrayItem && <p>{userProfile.summary}</p>}
                  <StarRatingComponent
                    name="rate"
                    starCount={5}
                    value={userProfile.rating}
                  />
                </div>
              </div>
              {isTrayItem && (
                <div className={isTrayItem ? 'col-2' : 'col-12'}>
                  <div className="charge-container">
                    <div>
                      {/* <i
                        className={`fa fa-${userProfile.currency.toLowerCase()}`}
                      /> */}
                      {userProfile.charge}
                    </div>
                    <div className="per-hour-title">PER HOUR</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherItem;

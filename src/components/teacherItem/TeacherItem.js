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
            <div
              className={
                isTrayItem
                  ? 'row row-without--margin tray-item--height'
                  : 'row row-without--margin'
              }
            >
              <div
                className={
                  isTrayItem
                    ? 'col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 profile-pic--align'
                    : 'col-12 col-without--padding profile-pic--align'
                }
              >
                <div
                  style={{
                    backgroundImage: `url( ${userProfile.profileImage} )`,
                    backgroundPosition: 'top center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',

                    margin: '10px'
                  }}
                  className={
                    isTrayItem
                      ? 'border_1px profile-pic-list'
                      : 'border_1px profile-pic-block'
                  }
                />
              </div>
              <div
                className={
                  isTrayItem
                    ? 'col-9 col-sm-9 col-md-7 col-lg-7 col-xl-7'
                    : 'col-12 col-without--padding'
                }
              >
                <div className="vd-content user-details--style">
                  <h6>{userProfile.firstName + ' ' + userProfile.lastName}</h6>
                  <p>
                    <strong>Subject:</strong> {userProfile.subject}
                  </p>

                  <StarRatingComponent
                    name="rate"
                    starCount={5}
                    value={userProfile.rating}
                  />
                </div>
              </div>
              {isTrayItem && userProfile.currency && (
                <div className="col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                  <div className="charge-container">
                    <div>
                      <i
                        className={
                          userProfile.currency.toLowerCase() !== 'pound'
                            ? `fa fa-${userProfile.currency.toLowerCase()}`
                            : 'fa fa-gbp'
                        }
                      />
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

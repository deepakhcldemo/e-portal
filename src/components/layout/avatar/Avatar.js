import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  ButtonToolbar,
  OverlayTrigger,
  Popover,
  Button
} from 'react-bootstrap';
import './index.css';
import AuthGuard from '../../../authguard/AuthGuard';
class Avatar extends Component {
  navigateTo = linkName => {
    this.props.history.push(linkName);
  };

  render() {
    return (
      <ButtonToolbar>
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover
              id="popover-positioned-bottom"
              title={
                this.props.userProfile.firstName +
                ' ' +
                this.props.userProfile.lastName
              }
            >
              {this.props.userProfile.role === 'Teacher' && (
                <div
                  className="avatar-item"
                  onClick={() => this.navigateTo('/teacher')}
                >
                  <i className="fa fa-dashboard"> Dashboard</i>{' '}
                </div>
              )}
              {this.props.userProfile.role === 'Student' && (
                <div
                  className="avatar-item"
                  onClick={() => this.navigateTo('/student')}
                >
                  <i className="fa fa-dashboard"> Dashboard</i>
                </div>
              )}
              <div
                className="avatar-item"
                onClick={() => this.navigateTo('/profile')}
              >
                <i className="fa fa-user"> Profile</i>{' '}
              </div>
              {this.props.currentUser.additionalUserInfo.providerId ===
                'password' && (
                <div
                  className="avatar-item"
                  onClick={() => this.navigateTo('/changePassword')}
                >
                  <i className="fa fa-refresh"> Change Password</i>{' '}
                </div>
              )}
              <div
                className="avatar-item"
                onClick={() =>
                  AuthGuard.signout(() => {
                    this.navigateTo('/home');
                  })
                }
              >
                <i className="fa fa-sign-out"> Sign Out</i>{' '}
              </div>
            </Popover>
          }
        >
          <Button variant="default" className="custom-btn">
            <i className="fa fa-user-circle home-header-nav-item home-header-nav-item--position avatar-icon" />
          </Button>
        </OverlayTrigger>
      </ButtonToolbar>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(Avatar)
);

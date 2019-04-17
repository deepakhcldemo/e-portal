import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ButtonToolbar, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import './index.css';
import AuthGuard from "../../../authguard/AuthGuard";
class Avatar extends Component {
  navigateTo = (linkName) => {
    this.props.history.push(linkName);
  }

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
                title={this.props.userProfile.firstName + ' ' + this.props.userProfile.lastName}
              >
                
                <div className="avatar-item" onClick={()=>this.navigateTo('/profile')}>Profile</div>
                {this.props.currentUser.additionalUserInfo.providerId ==='password' && <div className="avatar-item">Change Password</div>}
                <div className="avatar-item" onClick={() => AuthGuard.signout(() => { this.navigateTo('/home')})}>Sign Out</div>
                
        </Popover>
            }
          >
          <Button variant="default" className="custom-btn"><i className="fa fa-user-circle home-header-nav-item home-header-nav-item--position avatar-icon"></i></Button>
          </OverlayTrigger>
        
      </ButtonToolbar>
    );
  }
}

export default withRouter(connect(
  null,
  null
)(Avatar));

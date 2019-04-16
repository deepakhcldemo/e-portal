import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as loginAction from './actions';

import './styles.css';
import AuthGuard from '../../authguard/AuthGuard';
import { toastr } from 'react-redux-toastr';
import * as actionTypes from '../../spinnerStore/actions';
import { recoverPassword } from '../../database/dal/firebase/registrationDal';

let userIcon = {
  width: '20px',
  height: '20px',
  position: 'absolute',
  right: '12px',
  top: '12px',
  zIndex: '10',
  backgroundImage: 'url(' + '../../Assets/hdpi/login_disable.png' + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class PasswordReset extends Component {
  state = {
    username: '',
    submitted: false,
    loggedInStatus: false,
    errorMessage: '',
    redirectToReferrer: false
  };

  userIconStyle() {
    document.getElementById('userIcon').style.backgroundImage =
      'url(' + '../../Assets/hdpi/login_oragnge.png' + ')';
  }
  userIconDisableStyle() {
    document.getElementById('userIcon').style.backgroundImage =
      'url(' + '../../Assets/hdpi/login_disable.png' + ')';
  }

  passwordIconStyle() {
    document.getElementById('passwordIcon').style.backgroundImage =
      'url(' + '../../Assets/hdpi/password_orange.png' + ')';
  }
  passwordIconDisableStyle() {
    document.getElementById('passwordIcon').style.backgroundImage =
      'url(' + '../../Assets/hdpi/password_disable.png' + ')';
  }
  togglePassword = () => {
    var x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
    x.focus();
    this.passwordIconStyle();
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetPassword = () => {
    this.setState({ submitted: true });
    recoverPassword(this.state.username)
      .then(() => {
        toastr.success('Password Reset Link Sent Successfully');
        this.props.history.push('/login');
      })
      .catch(error => {
        this.setState({ username: '' });
        toastr.error('User Not Found. Please Enter Registered Email ID');
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    const appliedPolicy = JSON.parse(localStorage.getItem('applied-policy'));
    if (appliedPolicy && appliedPolicy.policyId) {
      this.props.history.push('/car-details/confirm');
    }

    const { username, submitted } = this.state;
    return (
      <div className="container-background">
        <div className="row row-without--margin">
          <div className="col-12 col-sm-8 col-md-8 col-lg-4 content-container content-align--middle">
            <div className="card card-border-radius">
            <div className="col-12 sign-in--text">
              <span className="text-style-1">-</span>
              <span className="sign-in-text--padding">Reset Password</span>
            </div>

              <form name="form" className="login-form--padding">
              <span className="help-block">
                {this.state.errorMessage ? this.state.errorMessage : ''}
              </span>
              <div
                className={
                  'form-group' + (submitted && !username ? ' has-error' : '')
                }
              >
                <label htmlFor="username">Enter Registered Email ID</label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control input-field--style form-input-icon--padding"
                    name="username"
                    value={username}
                    onFocus={this.userIconStyle}
                    onBlur={this.userIconDisableStyle}
                    onChange={this.handleChange}
                  />
                  <span
                    id="userIcon"
                    className="input-group-addon"
                    style={userIcon}
                  />
                </div>
                {submitted && !username && (
                  <div className="help-block">Email ID is required</div>
                )}
              </div>

              <div className="form-group padding-top-25">
                <button
                  onClick={this.resetPassword}
                  type="button"
                  className="btn btn-success btn-block"
                >
                  RESET PASSWORD
                </button>
              </div>
              <div className="form-group padding-top-25">
                <button
                  onClick={()=>this.props.history.push('/login')}
                  type="button"
                  className="btn btn-warning btn-block"
                >
                  CANCEL
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log('global state', state);
  return {
    loggedInStatus: state.login.loggedInStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: componentState => {
      console.log('call', componentState);

      dispatch(
        loginAction.loginRequestDispatch({
          userName: componentState.username,
          password: componentState.password
        })
      );
    },

    openPDFModal: () => dispatch({ type: 'open' }),

    setSpinnerStatus: val => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: val });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordReset);

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as loginAction from './actions';
import './styles.css';
import GLOBAL_VARIABLES from '../../config/Config';
import AuthGuard from '../../authguard/AuthGuard';
import { toastr } from 'react-redux-toastr';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { createUser } from '../../database/dal/registrationDal';
import * as actionTypes from '../../spinnerStore/actions';

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
let passwordIcon = {
  width: '20px',
  height: '15px',
  position: 'absolute',
  right: '10px',
  top: '15px',
  zIndex: '10',
  backgroundImage: 'url(' + '../../Assets/hdpi/password_disable.png' + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class Registration extends Component {
  state = {
    fname: '',
    lname: '',
    password: '',
    email: '',
    role: 'Select Role',
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

  handleDropdownSelection = e => {
    this.setState({ role: e });
  };

  register = () => {
    const { fname, lname, email, password, role } = this.state;
    this.setState({ submitted: true });
    this.props.setSpinnerStatus(true);
    const userDetails = { fname, lname, email, password, role };

    createUser(userDetails);
    // .then(
    //   response => {
    //     toastr.success(response);
    //     // this.props.history.push('/login');
    //   }
    //   // error => {
    //   //   toastr.error(error);
    //   // }
    // );
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

    const { loggingIn } = this.props;
    const { fname, lname, email, password, submitted } = this.state;
    return (
      <div
        style={{
          backgroundImage: 'url(' + '../../Assets/hdpi/boardBG_1.jpg ' + ')',
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="row row-without--margin">
          <div className="col-12 col-sm-8 col-md-8 col-lg-4 content-container">
            <div className="col-12 sign-in--text">
              <span className="text-style-1">-</span>
              <span className="sign-in-text--padding">Register Here</span>
            </div>

            <form name="form">
              <span className="help-block">
                {this.state.errorMessage ? this.state.errorMessage : ''}
              </span>
              <div
                className={
                  'form-group' + (submitted && !fname ? ' has-error' : '')
                }
              >
                <label htmlFor="username">First Name</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control input-field--style form-input-icon--padding"
                    name="fname"
                    value={fname}
                    onFocus={this.userIconStyle}
                    onBlur={this.userIconDisableStyle}
                    onChange={this.handleChange}
                  />
                </div>
                {submitted && !fname && (
                  <div className="help-block">First name is required</div>
                )}
              </div>
              <div
                className={
                  'form-group' + (submitted && !lname ? ' has-error' : '')
                }
              >
                <label htmlFor="username">Last Name</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control input-field--style form-input-icon--padding"
                    name="lname"
                    value={lname}
                    onFocus={this.userIconStyle}
                    onBlur={this.userIconDisableStyle}
                    onChange={this.handleChange}
                  />
                </div>
                {submitted && !lname && (
                  <div className="help-block">Last name is required</div>
                )}
              </div>
              <div
                className={
                  'form-group' + (submitted && !email ? ' has-error' : '')
                }
              >
                <label htmlFor="email">Email</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control input-field--style form-input-icon--padding"
                    name="email"
                    value={email}
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
                {submitted && !email && (
                  <div className="help-block">Email is required</div>
                )}
              </div>
              <div
                className={
                  'form-group' + (submitted && !password ? ' has-error' : '')
                }
              >
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <input
                    id="password"
                    type="password"
                    className="form-control input-field--style"
                    name="password"
                    value={password}
                    onFocus={this.passwordIconStyle}
                    onBlur={this.passwordIconDisableStyle}
                    onChange={this.handleChange}
                  />
                  <span
                    id="passwordIcon"
                    className="input-group-addon"
                    style={passwordIcon}
                    onClick={this.togglePassword}
                  />
                </div>

                {submitted && !password && (
                  <div className="help-block">Password is required</div>
                )}
              </div>
              <DropdownButton
                id="dropdown-basic-button"
                title={this.state.role}
                onSelect={this.handleDropdownSelection}
              >
                <Dropdown.Item eventKey="Teacher">Teacher</Dropdown.Item>
                <Dropdown.Item eventKey="Student">Student</Dropdown.Item>
              </DropdownButton>

              <div className="form-group padding-top-25">
                <button
                  onClick={this.register}
                  type="button"
                  className="btn-login"
                >
                  REGISTER
                </button>
              </div>
            </form>
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
    setSpinnerStatus: val => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: val });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as loginAction from './actions';
import './styles.css';
import GLOBAL_VARIABLES from '../../config/config';
import AuthGuard from '../../authguard/AuthGuard';
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
const _userName = 'madan@hcl.com';
const _password = 'india@2018';
const successResponse = {
  success: {
    status: 'Success',
    message: 'Resource Retrieved Successfully',
    data: 'Login Successful'
  }
};
const failureResponse = {
  failure: {
    status: 'Failure',
    message: 'RESOURCE_ALREADY_EXISTS',
    data: 'Invalid Username or Password'
  }
};

class Registration extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    submitted: false,
    loggedInStatus: false,
    errorMessage: '',
    redirectToReferrer: false
  };
  // componentWillMount() {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user && user.status === 'Success') {
  //     const appliedPolicy = JSON.parse(localStorage.getItem('applied-policy'));
  //     if (
  //       appliedPolicy &&
  //       appliedPolicy.updateItemResult &&
  //       appliedPolicy.updateItemResult.attributes
  //     ) {
  //       this.props.history.push('/car-details/confirm');
  //     } else {
  //       this.props.history.push('/car-details');
  //     }
  //   }
  // }
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

  authenticateUser(username, password) {
    let status = '';
    if (username === _userName && password === _password) {
      status = true;
    } else {
      status = false;
    }
    return new Promise((resolve, reject) => {
      status ? resolve(successResponse) : reject(failureResponse);
    });
  }

  login = () => {
    const { username, password } = this.state;
    this.setState({ submitted: true });
    this.props.setSpinnerStatus(true);
    if (username && password) {
      // axios
      //   .post(
      //     'http://ec2-54-221-159-167.compute-1.amazonaws.com:9001/user-management/usermgmt/users/login',
      //     {
      //       userName: username,
      //       password: password
      //     }
      //   )

      this.authenticateUser(username, password).then(
        postResponse => {
          this.props.setSpinnerStatus(false);
          localStorage.setItem('user', JSON.stringify(postResponse));
          AuthGuard.authenticate(() => {
            this.setState(() => ({
              redirectToReferrer: true
            }));
            console.log(
              'GLOBAL_VARIABLES.BASEROUTE',
              GLOBAL_VARIABLES.BASEROUTE
            );
            if (GLOBAL_VARIABLES.BASEROUTE !== '/login') {
              this.props.history.push(GLOBAL_VARIABLES.BASEROUTE);
            } else {
              this.props.history.push('/car-details');
            }
          });
        },
        error => {
          this.props.setSpinnerStatus(false);
          this.setState({
            errorMessage: 'Username or password is not correct.'
          });
        }
      );
    } else {
      this.props.setSpinnerStatus(false);
      return;
    }
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
    const { username, email, password, submitted } = this.state;
    return (
      <div
        style={{
          backgroundImage: 'url(' + '../../Assets/hdpi/boardBG_1.jpg ' + ')',
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="row">
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
                  'form-group' + (submitted && !username ? ' has-error' : '')
                }
              >
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <input
                    type="text"
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
                  <div className="help-block">Username is required</div>
                )}
              </div>
              <div
                className={
                  'form-group' + (submitted && !username ? ' has-error' : '')
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
              <div className="form-group padding-top-25">
                <button
                  onClick={this.login}
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

import React, { Component } from 'react';
import HeaderHome from '../../components/layout/header/HeaderHome';
// import axios from 'axios';
import './styles.css';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import * as actionTypes from '../../spinnerStore/actions';
import {
  saveUserProfile,
  getUserProfile,
  uploadUserProfilePic,
  getProfileDownloadUrl,
  getUserRating,
  createRatingRecord
} from '../../database/dal/firebase/registrationDal';
import { getAllCategory } from '../../database/dal/firebase/categoryDal';

let subjects = [];
class Profile extends Component {
  state = {
    gender: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    city: '',
    country: '',
    mobile: '',
    email: '',
    role: '',
    subject: '',
    charge: '',
    currency: '',
    summary: '',
    isUploading: false,
    profileImage:
      'https://firebasestorage.googleapis.com/v0/b/e-project-4e023.appspot.com/o/profilepic%2FuserProfile.png?alt=media&token=cfb3e9a8-8508-4acd-8e45-dd97e2ea3dec',
    submitted: false,
    errorMessage: '',
    rating: 0,
    noOfRatings: 0
  };

  constructor(props) {
    super(props);
    this.props.setSpinnerStatus(true);
  }

  handleDropdownSelection = (option, property) => {
    this.setState({ [property]: option });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount = () => {
    const userId = JSON.parse(localStorage.getItem('user')).user.uid;
    getAllCategory().onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        subjects = [...doc.data().subjects];
      });
    });

    getUserRating(userId).then(doc => {
      if (!doc.exists) {
        const ratingRecord = { rating: 0, ratings: [] };
        createRatingRecord(ratingRecord, userId);
      }
    });

    getUserProfile(userId).then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          const user = doc.data();
          if (doc.exists) {
            this.setState({
              firstName: user.firstName,
              lastName: user.lastName,
              dob: user.dob,
              gender: user.gender,
              address: user.address,
              city: user.city,
              country: user.country,
              email: user.email,
              mobile: user.mobile,
              role: user.role,
              profileImage: user.profileImage,
              subject: user.subject
            });
            if (user.role === 'Teacher') {
              this.setState({
                charge: user.charge,
                currency: user.currency,
                summary: user.summary
              });
            }
            if (user.rating) {
              this.setState({
                rating: user.rating
              });
            }
            if (user.noOfRatings) {
              this.setState({
                noOfRatings: user.noOfRatings
              });
            }
          }
        });
        this.props.setSpinnerStatus(false);
      },
      error => {
        this.props.setSpinnerStatus(false);
        toastr.error(error.message);
      }
    );
  };

  uploadProfilePic = e => {
    const fileDetails = e.target.files[0];
    const userId = JSON.parse(localStorage.getItem('user')).user.uid;
    if (fileDetails.type.indexOf('image') > -1) {
      this.setState({ isUploading: true, errorMessage: '' });
      uploadUserProfilePic(fileDetails, userId)
        .then(() => {
          getProfileDownloadUrl(fileDetails, userId).then(url => {
            this.setState({ isUploading: false, profileImage: url });
          });
        })
        .catch(error => {
          this.setState({ isUploading: false });
          toastr.error(error.code);
          console.log(error);
        });
    } else {
      this.setState({ errorMessage: 'Only Images Accepted' });
    }
  };

  saveDetails = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      dob,
      gender,
      address,
      city,
      country,
      email,
      mobile,
      role,
      subject,
      charge,
      currency,
      profileImage,
      summary
    } = this.state;

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const userId = userDetails.user.uid;
    this.setState({ submitted: true });

    if (role === 'Teacher') {
      const teacherDetails = {
        firstName,
        lastName,
        dob,
        gender,
        address,
        city,
        country,
        email,
        mobile,
        role,
        subject,
        charge,
        currency,
        profileImage,
        summary,
        userId
      };

      if (
        firstName !== '' &&
        lastName !== '' &&
        dob !== '' &&
        gender !== '' &&
        address !== '' &&
        city !== '' &&
        country !== '' &&
        email !== '' &&
        mobile !== '' &&
        role !== '' &&
        subject !== '' &&
        charge !== '' &&
        currency !== ''
      ) {
        teacherDetails.createdAt = new Date(Number(userDetails.user.createdAt));
        if (this.state.rating === 0) {
          teacherDetails.rating = 0;
        } else {
          teacherDetails.rating = this.state.rating;
        }
        if (this.state.noOfRatings === 0) {
          teacherDetails.noOfRatings = 0;
        } else {
          teacherDetails.noOfRatings = this.state.noOfRatings;
        }
        saveUserProfile(teacherDetails).then(() => {
          localStorage.setItem('userProfile', JSON.stringify(teacherDetails));
          toastr.success('Details Saved Successfully');
          this.props.history.push('/teacher');
        });
      }
    } else {
      const studentDetails = {
        firstName,
        lastName,
        dob,
        gender,
        address,
        city,
        country,
        email,
        mobile,
        role,
        subject,
        profileImage,
        userId
      };

      if (
        firstName !== '' &&
        lastName !== '' &&
        dob !== '' &&
        gender !== '' &&
        address !== '' &&
        city !== '' &&
        country !== '' &&
        email !== '' &&
        mobile !== '' &&
        role !== '' &&
        subject !== ''
      ) {
        studentDetails.createdAt = new Date(userDetails.user.createdAt);

        if (this.state.rating === 0) {
          studentDetails.rating = 0;
        } else {
          studentDetails.rating = this.state.rating;
        }
        if (this.state.noOfRatings === 0) {
          studentDetails.noOfRatings = 0;
        } else {
          studentDetails.noOfRatings = this.state.noOfRatings;
        }
        saveUserProfile(studentDetails).then(() => {
          localStorage.setItem('userProfile', JSON.stringify(studentDetails));
          toastr.success('Details Saved Successfully');
          this.props.history.push('/student');
        });
      }
    }
  };

  render() {
    const {
      firstName,
      lastName,
      dob,
      gender,
      address,
      city,
      country,
      email,
      mobile,
      role,
      subject,
      charge,
      currency,
      summary,
      profileImage,
      isUploading,
      submitted
    } = this.state;

    const selectSubject = subjects.map(data => {
      return (
        <Dropdown.Item key={data} eventKey={data}>
          {data}
        </Dropdown.Item>
      );
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <HeaderHome headeTitle="User Profile" />
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 center-form">
          <div className="panel panel-default">
            <div className="card col-lg-11 col-xl-11 panel-body profile-container--style">
              <form>
                <div className="panel-heading">
                  <h3 className="panel-title">Personal Details</h3>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <div className="profile-image-placeholder">
                        <img
                          src={profileImage}
                          className="img-thumbnail thumbnail-style"
                          alt="User Profile"
                          width="240"
                          height="200"
                        />
                      </div>
                      {isUploading && (
                        <div className="text-block ">
                          <span className="blink-text">Uploading...</span>
                        </div>
                      )}
                      <div className="custom-file file-margin">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="profileImage"
                          accept="image/*"
                          onChange={e => this.uploadProfilePic(e)}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="profileImage"
                        >
                          Choose a profile pic...
                        </label>
                        <span className="help-block">
                          {this.state.errorMessage
                            ? this.state.errorMessage
                            : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label className="label-color" htmlFor="first_name">
                      First Name*
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !firstName && (
                        <div className="help-block">FirstName is required</div>
                      )}
                    </div>
                    <label className="label-color" htmlFor="first_name">
                      Last Name*
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !lastName && (
                        <div className="help-block">LastName is required</div>
                      )}
                    </div>
                    <label className="label-color" htmlFor="gender">
                      Gender*
                    </label>

                    <DropdownButton
                      id="dropdown-basic-button"
                      name="gender"
                      title={gender}
                      variant="default"
                      onSelect={e => this.handleDropdownSelection(e, 'gender')}
                    >
                      <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                      <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                      <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                    </DropdownButton>
                    {submitted && !gender && (
                      <div className="help-block">Gender is required</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label className="label-color" htmlFor="DOB">
                      DOB*
                    </label>
                    <div className="form-group">
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={dob}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !dob && (
                        <div className="help-block">DOB is required</div>
                      )}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <label className="label-color" htmlFor="email">
                        Email*
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !email && (
                        <div className="help-block">Email is required</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="label-color" htmlFor="address">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={this.handleChange}
                    className="form-control input-sm"
                  />
                  {submitted && !address && (
                    <div className="help-block">Address is required</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label className="label-color" htmlFor="city">
                      City*
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={city}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !city && (
                        <div className="help-block">City is required</div>
                      )}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label className="label-color" htmlFor="country">
                      Country*
                    </label>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={country}
                      variant="default"
                      onSelect={e => this.handleDropdownSelection(e, 'country')}
                    >
                      <Dropdown.Item eventKey="Afghanistan">
                        Afghanistan
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Albania">Albania</Dropdown.Item>
                      <Dropdown.Item eventKey="Algeria">Algeria</Dropdown.Item>
                      <Dropdown.Item eventKey="American Samoa">
                        American Samoa
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Andorra">Andorra</Dropdown.Item>
                      <Dropdown.Item eventKey="Angola">Angola</Dropdown.Item>
                      <Dropdown.Item eventKey="Anguilla">
                        Anguilla
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Antartica">
                        Antarctica
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Antigua and Barbuda">
                        Antigua and Barbuda
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Argentina">
                        Argentina
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Armenia">Armenia</Dropdown.Item>
                      <Dropdown.Item eventKey="Aruba">Aruba</Dropdown.Item>
                      <Dropdown.Item eventKey="Australia">
                        Australia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Austria">Austria</Dropdown.Item>
                      <Dropdown.Item eventKey="Azerbaijan">
                        Azerbaijan
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Bahamas">Bahamas</Dropdown.Item>
                      <Dropdown.Item eventKey="Bahrain">Bahrain</Dropdown.Item>
                      <Dropdown.Item eventKey="Bangladesh">
                        Bangladesh
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Barbados">
                        Barbados
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Belarus">Belarus</Dropdown.Item>
                      <Dropdown.Item eventKey="Belgium">Belgium</Dropdown.Item>
                      <Dropdown.Item eventKey="Belize">Belize</Dropdown.Item>
                      <Dropdown.Item eventKey="Benin">Benin</Dropdown.Item>
                      <Dropdown.Item eventKey="Bermuda">Bermuda</Dropdown.Item>
                      <Dropdown.Item eventKey="Bhutan">Bhutan</Dropdown.Item>
                      <Dropdown.Item eventKey="Bolivia">Bolivia</Dropdown.Item>
                      <Dropdown.Item eventKey="Bosnia and Herzegowina">
                        Bosnia and Herzegowina
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Botswana">
                        Botswana
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Bouvet Island">
                        Bouvet Island
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Brazil">Brazil</Dropdown.Item>
                      <Dropdown.Item eventKey="British Indian Ocean Territory">
                        British Indian Ocean Territory
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Brunei Darussalam">
                        Brunei Darussalam
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Bulgaria">
                        Bulgaria
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Burkina Faso">
                        Burkina Faso
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Burundi">Burundi</Dropdown.Item>
                      <Dropdown.Item eventKey="Cambodia">
                        Cambodia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Cameroon">
                        Cameroon
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
                      <Dropdown.Item eventKey="Cape Verde">
                        Cape Verde
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Cayman Islands">
                        Cayman Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Central African Republic">
                        Central African Republic
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Chad">Chad</Dropdown.Item>
                      <Dropdown.Item eventKey="Chile">Chile</Dropdown.Item>
                      <Dropdown.Item eventKey="China">China</Dropdown.Item>
                      <Dropdown.Item eventKey="Christmas Island">
                        Christmas Island
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Cocos Islands">
                        Cocos (Keeling) Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Colombia">
                        Colombia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Comoros">Comoros</Dropdown.Item>
                      <Dropdown.Item eventKey="Congo">Congo</Dropdown.Item>
                      <Dropdown.Item eventKey="Congo">
                        Congo, the Democratic Republic of the
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Cook Islands">
                        Cook Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Costa Rica">
                        Costa Rica
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Cota D'Ivoire">
                        Cote d'Ivoire
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Croatia">
                        Croatia (Hrvatska)
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Cuba">Cuba</Dropdown.Item>
                      <Dropdown.Item eventKey="Cyprus">Cyprus</Dropdown.Item>
                      <Dropdown.Item eventKey="Czech Republic">
                        Czech Republic
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Denmark">Denmark</Dropdown.Item>
                      <Dropdown.Item eventKey="Djibouti">
                        Djibouti
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Dominica">
                        Dominica
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Dominican Republic">
                        Dominican Republic
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="East Timor">
                        East Timor
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Ecuador">Ecuador</Dropdown.Item>
                      <Dropdown.Item eventKey="Egypt">Egypt</Dropdown.Item>
                      <Dropdown.Item eventKey="El Salvador">
                        El Salvador
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Equatorial Guinea">
                        Equatorial Guinea
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Eritrea">Eritrea</Dropdown.Item>
                      <Dropdown.Item eventKey="Estonia">Estonia</Dropdown.Item>
                      <Dropdown.Item eventKey="Ethiopia">
                        Ethiopia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Falkland Islands">
                        Falkland Islands (Malvinas)
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Faroe Islands">
                        Faroe Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Fiji">Fiji</Dropdown.Item>
                      <Dropdown.Item eventKey="Finland">Finland</Dropdown.Item>
                      <Dropdown.Item eventKey="France">France</Dropdown.Item>
                      <Dropdown.Item eventKey="France Metropolitan">
                        France, Metropolitan
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="French Guiana">
                        French Guiana
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="French Polynesia">
                        French Polynesia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="French Southern Territories">
                        French Southern Territories
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Gabon">Gabon</Dropdown.Item>
                      <Dropdown.Item eventKey="Gambia">Gambia</Dropdown.Item>
                      <Dropdown.Item eventKey="Georgia">Georgia</Dropdown.Item>
                      <Dropdown.Item eventKey="Germany">Germany</Dropdown.Item>
                      <Dropdown.Item eventKey="Ghana">Ghana</Dropdown.Item>
                      <Dropdown.Item eventKey="Gibraltar">
                        Gibraltar
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Greece">Greece</Dropdown.Item>
                      <Dropdown.Item eventKey="Greenland">
                        Greenland
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Grenada">Grenada</Dropdown.Item>
                      <Dropdown.Item eventKey="Guadeloupe">
                        Guadeloupe
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Guam">Guam</Dropdown.Item>
                      <Dropdown.Item eventKey="Guatemala">
                        Guatemala
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Guinea">Guinea</Dropdown.Item>
                      <Dropdown.Item eventKey="Guinea-Bissau">
                        Guinea-Bissau
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Guyana">Guyana</Dropdown.Item>
                      <Dropdown.Item eventKey="Haiti">Haiti</Dropdown.Item>
                      <Dropdown.Item eventKey="Heard and McDonald Islands">
                        Heard and Mc Donald Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Holy See">
                        Holy See (Vatican City State)
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Honduras">
                        Honduras
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Hong Kong">
                        Hong Kong
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Hungary">Hungary</Dropdown.Item>
                      <Dropdown.Item eventKey="Iceland">Iceland</Dropdown.Item>
                      <Dropdown.Item eventKey="India">India</Dropdown.Item>
                      <Dropdown.Item eventKey="Indonesia">
                        Indonesia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Iran">
                        Iran (Islamic Republic of)
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Iraq">Iraq</Dropdown.Item>
                      <Dropdown.Item eventKey="Ireland">Ireland</Dropdown.Item>
                      <Dropdown.Item eventKey="Israel">Israel</Dropdown.Item>
                      <Dropdown.Item eventKey="Italy">Italy</Dropdown.Item>
                      <Dropdown.Item eventKey="Jamaica">Jamaica</Dropdown.Item>
                      <Dropdown.Item eventKey="Japan">Japan</Dropdown.Item>
                      <Dropdown.Item eventKey="Jordan">Jordan</Dropdown.Item>
                      <Dropdown.Item eventKey="Kazakhstan">
                        Kazakhstan
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Kenya">Kenya</Dropdown.Item>
                      <Dropdown.Item eventKey="Kiribati">
                        Kiribati
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Democratic People's Republic of Korea">
                        Korea, Democratic People's Republic of
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Korea">
                        Korea, Republic of
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Kuwait">Kuwait</Dropdown.Item>
                      <Dropdown.Item eventKey="Kyrgyzstan">
                        Kyrgyzstan
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Lao">
                        Lao People's Democratic Republic
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Latvia">Latvia</Dropdown.Item>
                      <Dropdown.Item eventKey="Lebanon" selected>
                        Lebanon
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Lesotho">Lesotho</Dropdown.Item>
                      <Dropdown.Item eventKey="Liberia">Liberia</Dropdown.Item>
                      <Dropdown.Item eventKey="Libyan Arab Jamahiriya">
                        Libyan Arab Jamahiriya
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Liechtenstein">
                        Liechtenstein
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Lithuania">
                        Lithuania
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Luxembourg">
                        Luxembourg
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Macau">Macau</Dropdown.Item>
                      <Dropdown.Item eventKey="Macedonia">
                        Macedonia, The Former Yugoslav Republic of
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Madagascar">
                        Madagascar
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Malawi">Malawi</Dropdown.Item>
                      <Dropdown.Item eventKey="Malaysia">
                        Malaysia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Maldives">
                        Maldives
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Mali">Mali</Dropdown.Item>
                      <Dropdown.Item eventKey="Malta">Malta</Dropdown.Item>
                      <Dropdown.Item eventKey="Marshall Islands">
                        Marshall Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Martinique">
                        Martinique
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Mauritania">
                        Mauritania
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Mauritius">
                        Mauritius
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Mayotte">Mayotte</Dropdown.Item>
                      <Dropdown.Item eventKey="Mexico">Mexico</Dropdown.Item>
                      <Dropdown.Item eventKey="Micronesia">
                        Micronesia, Federated States of
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Moldova">
                        Moldova, Republic of
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Monaco">Monaco</Dropdown.Item>
                      <Dropdown.Item eventKey="Mongolia">
                        Mongolia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Montserrat">
                        Montserrat
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Morocco">Morocco</Dropdown.Item>
                      <Dropdown.Item eventKey="Mozambique">
                        Mozambique
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Myanmar">Myanmar</Dropdown.Item>
                      <Dropdown.Item eventKey="Namibia">Namibia</Dropdown.Item>
                      <Dropdown.Item eventKey="Nauru">Nauru</Dropdown.Item>
                      <Dropdown.Item eventKey="Nepal">Nepal</Dropdown.Item>
                      <Dropdown.Item eventKey="Netherlands">
                        Netherlands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Netherlands Antilles">
                        Netherlands Antilles
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="New Caledonia">
                        New Caledonia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="New Zealand">
                        New Zealand
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Nicaragua">
                        Nicaragua
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Niger">Niger</Dropdown.Item>
                      <Dropdown.Item eventKey="Nigeria">Nigeria</Dropdown.Item>
                      <Dropdown.Item eventKey="Niue">Niue</Dropdown.Item>
                      <Dropdown.Item eventKey="Norfolk Island">
                        Norfolk Island
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Northern Mariana Islands">
                        Northern Mariana Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Norway">Norway</Dropdown.Item>
                      <Dropdown.Item eventKey="Oman">Oman</Dropdown.Item>
                      <Dropdown.Item eventKey="Pakistan">
                        Pakistan
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Palau">Palau</Dropdown.Item>
                      <Dropdown.Item eventKey="Panama">Panama</Dropdown.Item>
                      <Dropdown.Item eventKey="Papua New Guinea">
                        Papua New Guinea
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Paraguay">
                        Paraguay
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Peru">Peru</Dropdown.Item>
                      <Dropdown.Item eventKey="Philippines">
                        Philippines
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Pitcairn">
                        Pitcairn
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Poland">Poland</Dropdown.Item>
                      <Dropdown.Item eventKey="Portugal">
                        Portugal
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Puerto Rico">
                        Puerto Rico
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Qatar">Qatar</Dropdown.Item>
                      <Dropdown.Item eventKey="Reunion">Reunion</Dropdown.Item>
                      <Dropdown.Item eventKey="Romania">Romania</Dropdown.Item>
                      <Dropdown.Item eventKey="Russia">
                        Russian Federation
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Rwanda">Rwanda</Dropdown.Item>
                      <Dropdown.Item eventKey="Saint Kitts and Nevis">
                        Saint Kitts and Nevis
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Saint LUCIA">
                        Saint LUCIA
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Saint Vincent">
                        Saint Vincent and the Grenadines
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Samoa">Samoa</Dropdown.Item>
                      <Dropdown.Item eventKey="San Marino">
                        San Marino
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Sao Tome and Principe">
                        Sao Tome and Principe
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Saudi Arabia">
                        Saudi Arabia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Senegal">Senegal</Dropdown.Item>
                      <Dropdown.Item eventKey="Seychelles">
                        Seychelles
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Sierra">
                        Sierra Leone
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Singapore">
                        Singapore
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Slovakia">
                        Slovakia (Slovak Republic)
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Slovenia">
                        Slovenia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Solomon Islands">
                        Solomon Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Somalia">Somalia</Dropdown.Item>
                      <Dropdown.Item eventKey="South Africa">
                        South Africa
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="South Georgia">
                        South Georgia and the South Sandwich Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Span">Spain</Dropdown.Item>
                      <Dropdown.Item eventKey="SriLanka">
                        Sri Lanka
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="St. Helena">
                        St. Helena
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="St. Pierre and Miguelon">
                        St. Pierre and Miquelon
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Sudan">Sudan</Dropdown.Item>
                      <Dropdown.Item eventKey="Suriname">
                        Suriname
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Svalbard">
                        Svalbard and Jan Mayen Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Swaziland">
                        Swaziland
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Sweden">Sweden</Dropdown.Item>
                      <Dropdown.Item eventKey="Switzerland">
                        Switzerland
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Syria">
                        Syrian Arab Republic
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Taiwan">
                        Taiwan, Province of China
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Tajikistan">
                        Tajikistan
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Tanzania">
                        Tanzania, United Republic of
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Thailand">
                        Thailand
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Togo">Togo</Dropdown.Item>
                      <Dropdown.Item eventKey="Tokelau">Tokelau</Dropdown.Item>
                      <Dropdown.Item eventKey="Tonga">Tonga</Dropdown.Item>
                      <Dropdown.Item eventKey="Trinidad and Tobago">
                        Trinidad and Tobago
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Tunisia">Tunisia</Dropdown.Item>
                      <Dropdown.Item eventKey="Turkey">Turkey</Dropdown.Item>
                      <Dropdown.Item eventKey="Turkmenistan">
                        Turkmenistan
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Turks and Caicos">
                        Turks and Caicos Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Tuvalu">Tuvalu</Dropdown.Item>
                      <Dropdown.Item eventKey="Uganda">Uganda</Dropdown.Item>
                      <Dropdown.Item eventKey="Ukraine">Ukraine</Dropdown.Item>
                      <Dropdown.Item eventKey="United Arab Emirates">
                        United Arab Emirates
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="United Kingdom">
                        United Kingdom
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="United States">
                        United States
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="United States Minor Outlying Islands">
                        United States Minor Outlying Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Uruguay">Uruguay</Dropdown.Item>
                      <Dropdown.Item eventKey="Uzbekistan">
                        Uzbekistan
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Vanuatu">Vanuatu</Dropdown.Item>
                      <Dropdown.Item eventKey="Venezuela">
                        Venezuela
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Vietnam">Viet Nam</Dropdown.Item>
                      <Dropdown.Item eventKey="Virgin Islands (British)">
                        Virgin Islands (British)
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Virgin Islands (U.S)">
                        Virgin Islands (U.S.)
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Wallis and Futana Islands">
                        Wallis and Futuna Islands
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Western Sahara">
                        Western Sahara
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Yemen">Yemen</Dropdown.Item>
                      <Dropdown.Item eventKey="Yugoslavia">
                        Yugoslavia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Zambia">Zambia</Dropdown.Item>
                      <Dropdown.Item eventKey="Zimbabwe">
                        Zimbabwe
                      </Dropdown.Item>
                    </DropdownButton>
                    {submitted && !country && (
                      <div className="help-block">Country is required</div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <label className="label-color" htmlFor="mobile">
                      Mobile No.*
                    </label>
                    <div className="form-group">
                      <input
                        type="number"
                        name="mobile"
                        id="mobile"
                        value={mobile}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !mobile && (
                        <div className="help-block">Mobile No. is required</div>
                      )}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6" />
                </div>

                <div className="panel-heading">
                  <h3 className="panel-title">Expertise Details</h3>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <label className="label-color" htmlFor="role">
                      Role*
                    </label>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={role}
                      variant="default"
                      onSelect={e => this.handleDropdownSelection(e, 'role')}
                    >
                      <Dropdown.Item eventKey="Teacher">Teacher</Dropdown.Item>
                      <Dropdown.Item eventKey="Student">Student</Dropdown.Item>
                    </DropdownButton>
                    {submitted && !role && (
                      <div className="help-block">Role is required</div>
                    )}
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6" />
                </div>
                {role === 'Teacher' && (
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <label className="label-color" htmlFor="subject">
                        Subject*
                      </label>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={subject}
                        variant="default"
                        onSelect={e =>
                          this.handleDropdownSelection(e, 'subject')
                        }
                      >
                        {selectSubject}
                      </DropdownButton>
                      {submitted && !subject && (
                        <div className="help-block">Subject is required</div>
                      )}
                    </div>
                  </div>
                )}
                {role === 'Teacher' && (
                  <div className="form-group">
                    <label className="label-color" htmlFor="summary">
                      Summary (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="summary"
                      value={summary}
                      onChange={this.handleChange}
                      id="summary"
                    />
                  </div>
                )}
                {role === 'Teacher' && (
                  <div className="panel-heading">
                    <h3 className="panel-title">Pricing Details</h3>
                  </div>
                )}
                {role === 'Teacher' && (
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <label className="label-color" htmlFor="charge">
                        Charge (per hour)*
                      </label>
                      <div className="form-group">
                        <input
                          type="number"
                          name="charge"
                          id="charge"
                          value={charge}
                          onChange={this.handleChange}
                          className="form-control input-sm"
                        />
                        {submitted && !charge && (
                          <div className="help-block">Charge is required</div>
                        )}
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <label className="label-color" htmlFor="currency">
                        Currency*
                      </label>

                      <DropdownButton
                        id="dropdown-basic-button"
                        name="currency"
                        title={currency}
                        variant="default"
                        onSelect={e =>
                          this.handleDropdownSelection(e, 'currency')
                        }
                      >
                        <Dropdown.Item eventKey="Dollar">Dollar</Dropdown.Item>
                        <Dropdown.Item eventKey="Pound">Pound</Dropdown.Item>
                        <Dropdown.Item eventKey="Euro">Euro</Dropdown.Item>
                        <Dropdown.Item eventKey="Rupee">Rupee</Dropdown.Item>
                      </DropdownButton>
                      {submitted && !currency && (
                        <div className="help-block">Currency is required</div>
                      )}
                    </div>
                  </div>
                )}

                {role === 'Student' && (
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <label className="label-color" htmlFor="role">
                        Subject Interested In
                      </label>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={subject}
                        variant="default"
                        onSelect={e =>
                          this.handleDropdownSelection(e, 'subject')
                        }
                      >
                        {selectSubject}
                      </DropdownButton>
                      {submitted && !subject && (
                        <div className="help-block">Subject is required</div>
                      )}
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" />
                  </div>
                )}

                <div className="row padding-top-15">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <button
                      type="button"
                      onClick={() => {
                        this.props.history.push('/home');
                      }}
                      // onClick={() => saveFeedback()}
                      className="btn btn-dark btn-block"
                    >
                      CANCEL
                    </button>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <button
                      type="button"
                      onClick={e => this.saveDetails(e)}
                      // onClick={() => saveFeedback()}
                      className="btn btn-dark btn-block"
                    >
                      SAVE DETAILS
                    </button>
                  </div>
                </div>
                <div className="form-group padding-top-15" />
                <div className="col-12">&nbsp;</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // loggedInStatus: state.login.loggedInStatus
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

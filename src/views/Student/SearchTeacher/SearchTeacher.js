import React, { Component } from 'react';
//import GLOBAL_VARIABLES from '../../config/config';
import HeaderHome from '../../../components/layout/header/HeaderHome';
import { STUDENT_DASHBOARD_LINKS } from './../../../constant/Constant';
import Navbar from './../../../shared/components/Navbar';
import { getTeachersBasedOnCateogy } from './searchTeacherAction';
import Navigation from '../Navigation/Navigation';
import { connect } from 'react-redux';
import Select from 'react-select';
import './SearchTeacher.css';

import CalendarModal from '../../../shared/components/calendar-modal/calendarmodal';
class SearchTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      placeHolderValue: '',
      calendarModal: false,
      searchValue: '',
      filtredTeacherRecord: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getSerachParameter = this.getSerachParameter.bind(this);
    this.filterBasedOnName = this.filterBasedOnName.bind(this);
    this.filterBasedOnEmail = this.filterBasedOnEmail.bind(this);
    this.filterBasedOnLocation = this.filterBasedOnLocation.bind(this);
    this.setfilteredTeacher = this.setfilteredTeacher.bind(this);
  }

  componentDidMount() {
    this.props.getTeachersBasedOnCateogy();
  }

  handleChange = selectedOption => {
    this.setState({
      selectedOption,
      placeHolderValue: selectedOption.value
    });
  };

  setSaerchValue = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  getSerachParameter = () => {
    if (this.state.searchValue && this.state.selectedOption) {
      switch (this.state.selectedOption.value) {
        case 'Name':
          this.filterBasedOnName(this.state.searchValue);
          break;
        case 'Mobile Number':
          this.filterBasedOnMobile(this.state.searchValue);
          break;
        case 'Email':
          this.filterBasedOnEmail(this.state.searchValue);
          break;
        case 'Location':
          this.filterBasedOnLocation(this.state.searchValue);
          break;
        default:
        // code block
      }
    }
  };
  setfilteredTeacher = filteredRecords => {
    this.setState({
      filtredTeacherRecord: filteredRecords
    });
  };

  filterBasedOnName = searchName => {
    const teacherRecord = [];
    this.props.TeacherList.map(teacher => {
      if (
        teacher.role === 'Teacher' &&
        (teacher.firstName === searchName || teacher.lastName === searchName)
      ) {
        teacherRecord.push(teacher);
      }
    });

    this.setfilteredTeacher(teacherRecord);
  };

  filterBasedOnMobile = searchMobile => {
    const teacherRecord = [];
    this.props.TeacherList.map(teacher => {
      if (teacher.role === 'Teacher' && teacher.mobile === searchMobile) {
        teacherRecord.push(teacher);
      }
    });
    this.setfilteredTeacher(teacherRecord);
  };

  filterBasedOnEmail = searchEmail => {
    const teacherRecord = [];
    this.props.TeacherList.map(teacher => {
      if (teacher.role === 'Teacher' && teacher.email === searchEmail) {
        teacherRecord.push(teacher);
      }
    });

    this.setfilteredTeacher(teacherRecord);
  };

  openCalendarModal = () => {
    this.setState({ calendarModal: true });
  };
  closeCalendarModal = () => {
    this.setState({ calendarModal: false });
  };

  filterBasedOnLocation = searchLocation => {
    const teacherRecord = [];
    this.props.TeacherList.map(teacher => {
      if (
        teacher.role === 'Teacher' &&
        (teacher.address === searchLocation ||
          teacher.city === searchLocation ||
          teacher.country === searchLocation)
      ) {
        teacherRecord.push(teacher);
      }
    });

    this.setfilteredTeacher(teacherRecord);
  };
  render() {
    const filetredTeacherData = this.state.filtredTeacherRecord.map(teacher => {
      return (
        <div className="col-md-3">
          <div className="card">
            <img
              src={teacher.profileImage}
              alt="teacher"
              className="profile-image"
            />
            <div className="container">
              <h4>
                <b>
                  {teacher.firstName} {teacher.lastName}
                </b>
              </h4>
              <p>{teacher.subject}</p>
            </div>
          </div>
        </div>
      );
    });
    const options = [
      { value: 'Name', label: 'Name' },
      { value: 'Location', label: 'Location' },
      { value: 'Mobile Number', label: 'Mobile Number' },
      { value: 'Email', label: 'Email' }
    ];

    const { selectedOption } = this.state;
    return (
      <div>
        <div>
          <HeaderHome
            headeTitle="Student Dashboard"
            dashboardLinks={STUDENT_DASHBOARD_LINKS}
          />
        </div>
        <div className="filter-search">
          <div className="filter-teacher">
            <span>Filter By Category :</span>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </div>
          <div className="input-group search-teacher">
            <input
              type="text"
              className="form-control"
              value={this.state.value}
              onChange={value => this.setSaerchValue(value)}
              placeholder={'Search for..' + this.state.placeHolderValue}
              name="srch-term"
              id="srch-term"
            />
          </div>
          <button onClick={this.getSerachParameter}>Search</button>
          <div className="wrapper">{filetredTeacherData}</div>
          <div className="input-group chat-btn">
            <input
              onClick={this.openCalendarModal}
              type="button"
              className="btn btn-success"
              value="Initiate Chat"
            />
            <input
              type="button"
              className="btn btn-success"
              value="Initiate Chat"
            />
          </div>
        </div>
        <div>
          <CalendarModal
            modalState={this.state.calendarModal}
            closeCalendarModal={this.closeCalendarModal}
            classes="calendar-modal"
          />
        </div>
        <Navbar links={STUDENT_DASHBOARD_LINKS} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('satate', state);
  return {
    modalSata: state.classes,
    carouselRows: state.carouselStore.carouselData,
    TeacherList: state.searchTeacher.teacherDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTeachersBasedOnCateogy: selectedValue =>
      dispatch(getTeachersBasedOnCateogy(selectedValue))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTeacher);
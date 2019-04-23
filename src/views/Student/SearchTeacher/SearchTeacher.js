import React, { Component } from 'react';
//import GLOBAL_VARIABLES from '../../config/config';
import HeaderHome from '../../../components/layout/header/HeaderHome';
import { STUDENT_DASHBOARD_LINKS } from './../../../constant/Constant';
import Navbar from './../../../shared/components/Navbar';
import { getTeachersBasedOnCateogy } from './searchTeacherAction';
import Navigation from '../Navigation/Navigation';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getAllCategory } from '../../../database/dal/firebase/categoryDal';

import Multiselect from 'multiselect-dropdown-react';
import './SearchTeacher.css';

import CalendarModal from '../../../shared/components/calendar-modal/calendarmodal';
import ListContainer from '../../../components/listContainer/ListContainer';
class SearchTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      searchParameter: [],
      placeHolderValue: '',
      calendarModal: false,
      searchValue: '',
      filtredTeacherRecord: [],
      showValidationMessage: '',
      noRecordMessage: 'Search for your teacher here',
      categoryList: [],
      selectedSubject: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getSerachParameter = this.getSerachParameter.bind(this);
    this.setfilteredTeacher = this.setfilteredTeacher.bind(this);
    this.subjectChange = this.subjectChange.bind(this);
  }

  componentDidMount() {
    getAllCategory().onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        const subjects = [...doc.data().subjects];
        this.setState({ categoryList: subjects });
        this.props.getTeachersBasedOnCateogy(subjects['0']);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.getSerachParameter(nextProps, 'defalutSubjectSelected');
  }

  handleChange = selectedOption => {
    this.setState({
      searchParameter: selectedOption
    });
  };

  setSaerchValue = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  openCalendarModal = () => {
    this.setState({ calendarModal: true });
  };
  closeCalendarModal = () => {
    this.setState({ calendarModal: false });
  };

  getSerachParameter = (searchParameter, defalutSubjectSelected) => {
    console.log('searchParameter', searchParameter);
    if (defalutSubjectSelected !== 'defalutSubjectSelected') {
      const lowerCase = this.state.searchValue.toLowerCase();
      const tempArray = [];
      this.props.TeacherList.forEach(teacher => {
        this.state.searchParameter.forEach(searchParameter => {
          if (
            searchParameter === 'Name' &&
            teacher.subject === this.state.selectedSubject
          ) {
            const teacherFirsnameLower = teacher.firstName.toLowerCase();
            const teacherLastNameLower = teacher.lastName.toLowerCase();
            if (
              teacherFirsnameLower.indexOf(lowerCase) !== -1 ||
              teacherLastNameLower.indexOf(lowerCase) !== -1
            ) {
              tempArray.push(teacher);
            }
          }

          if (
            searchParameter === 'Location' &&
            teacher.subject === this.state.selectedSubject
          ) {
            const teacherCityName = teacher.city.toLowerCase();
            const teacheraddress = teacher.address.toLowerCase();
            const teachercountry = teacher.country.toLowerCase();
            if (
              teacherCityName.indexOf(lowerCase) !== -1 ||
              teacheraddress.indexOf(lowerCase) !== -1 ||
              teachercountry.indexOf(lowerCase) !== -1
            ) {
              tempArray.push(teacher);
            }
          }
          if (
            searchParameter === 'currency' &&
            teacher.subject === this.state.selectedSubject
          ) {
            if (teacher.currency) {
              const teacherCurrency = teacher.currency.toLowerCase();
              if (teacherCurrency.indexOf(lowerCase) !== -1) {
                tempArray.push(teacher);
              }
            }
          }
        });
      });
      this.setState({
        filtredTeacherRecord: tempArray
      });
    } else {
      this.setState({
        filtredTeacherRecord: searchParameter.TeacherList
      });
    }
    //this.props.getTeachersBasedOnCateogy(this.state.selectedSubject);
  };

  setfilteredTeacher = filteredRecords => {
    this.setState({
      filtredTeacherRecord: filteredRecords
    });
  };

  subjectChange = subjectValue => {
    this.setState({
      selectedSubject: subjectValue.target.value
    });
    this.props.getTeachersBasedOnCateogy(subjectValue.target.value);
  };

  render() {
    let filetredTeacherData = this.state.filtredTeacherRecord.map(
      (teacher, index) => {
        return (
          <div className="col-md-3" key={index}>
            <div className="card">
              <div className="card-body">
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
                <div className="input-group chat-btn">
                  <input
                    onClick={this.openCalendarModal}
                    type="button"
                    className="btn btn-success"
                    value="Initiate Chat"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    );
    const searctTeacherData = [
      {
        name: 'Name',
        value: 'Name'
      },
      {
        name: 'Location',
        value: 'Location'
      },
      {
        name: 'Rating',
        value: 'rating'
      }
    ];
    console.log(
      this.state.filtredTeacherRecord,
      'this.state.filtredTeacherRecord in search teacher'
    );
    return (
      <div className="teacher-student-search container-fluid">
        <div>
          <HeaderHome
            headeTitle="Student Dashboard"
            dashboardLinks={STUDENT_DASHBOARD_LINKS}
          />
        </div>
        <div className="filter-search content-container--background">
          <p className="help-block validation-message">
            {this.state.showValidationMessage}
          </p>

          <div className="card">
            <div className="card-body">
              <div className="row row-without--margin">
                <div className=" filter-teacher add-padding col-xs-12 col-12 col-md-4">
                  <select
                    className="form-control"
                    onChange={this.subjectChange}
                  >
                    {this.state.categoryList.map(key => (
                      <option key={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div className="filter-teacher col-xs-12 col-12 col-md-4">
                  {/* <i className="fas fa-caret-down" /> */}
                  <Multiselect
                    options={searctTeacherData}
                    onSelectOptions={this.handleChange}
                    placeHolder="filter by Categoty"
                  />
                </div>
                <div className="input-group search-teacher col-xs-12 col-12 col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.searchValue}
                    onChange={value => this.setSaerchValue(value)}
                    placeholder={'Search for..' + this.state.placeHolderValue}
                    name="srch-term"
                    id="srch-term"
                  />
                  <span
                    className="fa fa-search teacher-search-icon"
                    onClick={this.getSerachParameter}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row">

                        {filetredTeacherData}
                    </div> */}
          <div>
            {this.state.filtredTeacherRecord && (
              <ListContainer
                listType="Teacher"
                itemList={this.state.filtredTeacherRecord}
              />
            )}
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
  console.log(
    'state.searchTeacher.teacherDetails',
    state.searchTeacher.teacherDetails
  );
  return {
    modalSata: state.classes,
    carouselRows: state.carouselStore.carouselData,
    TeacherList: state.searchTeacher.teacherDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTeachersBasedOnCateogy: selectedSubject =>
      dispatch(getTeachersBasedOnCateogy(selectedSubject))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTeacher);

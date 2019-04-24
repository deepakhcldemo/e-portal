import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { createBrowserHistory } from 'history';
import './styles.css';
import { withRouter } from 'react-router';
import { getAllCategory } from '../../database/dal/firebase/categoryDal';
import { sendSubjectToTeacherSearch } from './actions';

class CategoryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryList: []
    };
    this.navigateToSearchTeacher = this.navigateToSearchTeacher.bind(this);
  }
  state = {
    categoryList: []
  };

  componentDidMount = () => {
    getAllCategory().onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        const subjects = [...doc.data().subjects];
        this.setState({ categoryList: subjects });
      });
    });
  };

  navigateToSearchTeacher = subjectDetails => {
    this.props.sendSubjectToTeacherSearch(subjectDetails);
    this.props.history.push('/student/teacher');
  };

  render() {
    const { categoryList } = this.state;
    return (
      <div className="col-12 content-container--background categories-container-padding container-margin-20">
        <h4>Top Categories</h4>

        <div className="users-list">
          <div className="row category-container">
            {categoryList &&
              categoryList.map((listItem, index) => {
                return (
                  <div
                    key={index}
                    className="category-items--align"
                    onClick={() => this.navigateToSearchTeacher(listItem)}
                  >
                    <div className="card-style">
                      <div className="category-style">{listItem}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    sendSubjectToTeacherSearch: subject =>
      dispatch(sendSubjectToTeacherSearch(subject))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryItem)
);

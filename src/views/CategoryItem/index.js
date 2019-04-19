import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { getAllCategory } from '../../database/dal/firebase/categoryDal';

class CategoryItem extends Component {
  state = {
    categoryList: []
  };

  componentDidMount = () => {
    getAllCategory().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const subjects = [...doc.data().subjects];
        this.setState({ categoryList: subjects });
      });
    });
  };

  render() {
    const { categoryList } = this.state;
    return (
      <div className="col-12 content-container--background categories-container-padding">
        <h4>TOP CATEGORIES ></h4>

        <div className="users-list">
          <div className="row">
            {categoryList &&
              categoryList.map((list, index) => {
                return (
                  <div
                    key={index}
                    className="col-xs-3 col-sm-3 col-md-3 col-lg-3"
                  >
                    <div className="card card-style">
                      <div className="card-body category-style">{list}</div>
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
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItem);

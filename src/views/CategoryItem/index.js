import React, { Component } from 'react';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';
import './styles.css';

class CategoryItem extends Component {
  state = {
    categoryList: ['Business', 'Design', 'Music', 'IT & Software']
  };
  render() {
    const { categoryList } = this.state;
    return (
     
        <div className="col-12 content-container--background">
          <h4>TOP CATEGORIES ></h4>
          <hr />
          <div className="users-list">
            <div className="row">
              {categoryList &&
                categoryList.map((list, index) => {
                  return (
                    <div
                      key={index}
                      className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                    >
                      <div className="card">
                        <div className="card-body category-style">{list}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
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

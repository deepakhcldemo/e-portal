import React, { Component } from "react"
import { connect } from 'react-redux';
import "./styles.css"
import { CURRICULUM_CONSTANT } from './../../constant/Constant'

class List extends Component {

  render() {
    return ( 
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            {/* <h5>No Content</h5> */}        
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Content Type</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Learn</td>
                  <td>youTube</td>
                  <td>
                    <button 
                        type="button" 
                        title={CURRICULUM_CONSTANT.BUTTON.CONTENT.VIEW} 
                        className="btn btn-outline-primary btn-sm" 
                        onClick={() => this.handleContent('view')}>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                    </button>
                    <button 
                        type="button" 
                        title={CURRICULUM_CONSTANT.BUTTON.CONTENT.EDIT} 
                        className="btn btn-outline-primary btn-sm" 
                        onClick={() => this.handleContent('edit')}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button 
                        type="button" 
                        title={CURRICULUM_CONSTANT.BUTTON.CONTENT.DELETE} 
                        className="btn btn-outline-primary btn-sm" 
                        onClick={() => this.handleContent('delete')}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>        
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    treeData: state.curriculum
  };
};
const mapDispatchToProps = dispatch => {
  return {
    /* setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    } */
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);


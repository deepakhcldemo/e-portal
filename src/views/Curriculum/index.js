import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../../components/layout/header/Header";
import "./styles.css";
// TreeView
import TreeView from 'react-simple-jstree';
// jQuery
import jQuery from 'jquery';
// Put jQuery into window scope
window.jQuery = jQuery;

// import * as actionTypes from "../../spinnerStore/actions";

class Curriculum extends Component {

  state = {
    selectedNode: ''
  }

  handleChange(data) {
    this.setState({selectedNode: data.node.id})    
  }

  addCategory() {
    if (!this.state.selectedNode)
    alert('Please Select Node to Add Category')
  }

  addContent(){
    if (!this.state.selectedNode)
    alert('Please Select Node to Add Content')
  }

  render() {
    const { treeData } = this.props
    return (          
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <Header headeTitle="Curriculum" />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 adjust-top">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 pull-left extend">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Category <button type="button" className="btn btn-outline-primary btn-sm pull-right" onClick={() => this.addCategory()}><i className="fa fa-plus" aria-hidden="true"></i> Add Category</button></h5>
                  <TreeView treeData={treeData} 
                    onChange={(e, data) => this.handleChange(data)} 
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 pull-left extend">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Content <button type="button" className="btn btn-outline-primary btn-sm pull-right" onClick={() => this.addContent()}><i className="fa fa-plus" aria-hidden="true"></i> Add Content</button>              
</h5>
                </div>
              </div>
            </div>
          </div>
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
)(Curriculum);

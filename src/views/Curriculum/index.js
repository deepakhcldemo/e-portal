import React, { Component } from "react"
import { connect } from "react-redux"
import {toastr} from 'react-redux-toastr'

import Header from "../../components/layout/header/Header"
import List from './List';
import "./styles.css"
// TreeView
import TreeView from 'react-simple-jstree'
// jQuery
import jQuery from 'jquery'
// Model & Constant
import { SelectedNode } from './curriculum'
import { CURRICULUM_CONSTANT } from './../../constant/Constant'
// Put jQuery into window scope
window.jQuery = jQuery


// import * as actionTypes from "../../spinnerStore/actions";

class Curriculum extends Component {

  state = SelectedNode

  handleChange(data) {
    if (data.hasOwnProperty('node'))
    this.setState({selectedNode: data.node.id})
  }

  handleCategory(type) {
    if(!this.checkSelectedNode('category'))
    return false;
  }

  handleContent(type){
    if(!this.checkSelectedNode('content'))
    return false;
  }

  checkSelectedNode(type) {
    if (!this.state.selectedNode){
      toastr.warning(type, CURRICULUM_CONSTANT.MESSAGE.EMPTY);
      return false;
    }
    return true;
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
                  <div className="row">
                    <h5 className="card-title col-12 col-sm-12 col-md-12 col-lg-9 pull-left">{CURRICULUM_CONSTANT.HEADING.CATEGORY}</h5>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-3 pull-right">
                      { this.state.selectedNode && (                             
                        <div className="pull-right">                   
                          <button 
                            type="button" 
                            title={CURRICULUM_CONSTANT.BUTTON.CATEGORY.ADD} 
                            className="btn btn-outline-primary btn-sm" 
                            onClick={() => this.handleCategory('add')}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                          <button 
                            type="button" 
                            title={CURRICULUM_CONSTANT.BUTTON.CATEGORY.EDIT} 
                            className="btn btn-outline-primary btn-sm" 
                            onClick={() => this.handleCategory('edit')}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </button>
                          <button 
                            type="button" 
                            title={CURRICULUM_CONSTANT.BUTTON.CATEGORY.DELETE} 
                            className="btn btn-outline-primary btn-sm" 
                            onClick={() => this.handleCategory('delete')}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </div>
                        )
                      }
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <TreeView treeData={treeData} 
                        onChange={(e, data) => this.handleChange(data)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 pull-left extend">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <h5 className="card-title col-12 col-sm-12 col-md-12 col-lg-11 pull-left">{CURRICULUM_CONSTANT.HEADING.CONTENT}</h5>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-1 pull-right">
                      { this.state.selectedNode && (
                      <button 
                        type="button" 
                        title={CURRICULUM_CONSTANT.BUTTON.CONTENT.ADD} 
                        className="btn btn-outline-primary btn-sm" 
                        onClick={() => this.handleContent('add')}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>                      
                      )}
                    </div> 
                  </div>
                  <List/>               
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

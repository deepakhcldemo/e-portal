import React, { Component } from "react"
import { connect } from "react-redux"
import { toastr } from 'react-redux-toastr'
import Modal from 'react-responsive-modal'
// TreeView
import TreeView from 'react-simple-jstree'
import Header from "../../components/layout/header/Header"
import List from './List'
import "./styles.css"
// jQuery
import jQuery from 'jquery'
// Model & Constant
import { SelectedNode } from './curriculum'
import { CURRICULUM_CONSTANT } from './../../constant/Constant'
import { openModal, closeModal, addCategory, getCategory } from './actions';
// Put jQuery into window scope
window.jQuery = jQuery


// import * as actionTypes from "../../spinnerStore/actions";

class Curriculum extends Component {

  state = SelectedNode

  handleChange(data) {
    if (data.hasOwnProperty('node'))
    this.setState({selectedNode: data.node.id})
  }

  handleInputChange(e) {
    this.setState({
      [e.id]: e.value
    })
  }

  handleCategory(type) {
    if(!this.checkSelectedNode('category'))
    return false;
    this.setState({
      selectedCategory: type
    })
    this.props.openModal();
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
  Category(type){
    this.props.addCategory(this.state.selectedNode, this.state.category);
    this.props.closeModal();
  }
  componentDidMount() {
    this.props.getCategory();
  }
  render() {
    const { treeData, modalState } = this.props
    return (          
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <Header headeTitle="Curriculum" />
          </div>
        </div>
        <div className="row">
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
                        { this.state.selectedNode !== '0' && (
                          <>
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
                          </>
                        )}
                      </div>
                      )
                    }
                  </div>
                  <div className="clear"></div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  { treeData && (
                    <TreeView treeData={treeData} 
                      onChange={(e, data) => this.handleChange(data)} 
                    />
                  )}
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
        <Modal open={modalState} onClose={this.props.closeModal} center>
          { this.state.selectedCategory === 'add' && (
            <>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input id="category" type="email" 
                className="form-control" placeholder="Enter Category" 
                value={this.state.category} onChange={(e) => this.handleInputChange(e.target)} />
            </div>
            <button className="btn btn-outline-primary btn-sm" onClick={() => this.Category('add')} >Add</button>
            </>
          ) }
        </Modal>
      </div>      
    );
  }
}
const mapStateToProps = state => {
  return {
    treeData: state.curriculum.tree,
    modalState: state.curriculum.openModal
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
    addCategory: (parentId, name) => dispatch(addCategory(parentId, name)),
    getCategory: () => dispatch(getCategory())
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Curriculum);

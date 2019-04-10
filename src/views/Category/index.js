import React, { Component } from "react";
import { connect } from "react-redux";
import { TreeView } from "@progress/kendo-react-treeview";
import Modal from 'react-responsive-modal'
import Header from "../../components/layout/header/Header"
import "@progress/kendo-theme-default/dist/all.css";
import "./styles.css";

import { openModal, closeModal, getCategory, manageCategory } from './action';
import { SelectedNode } from './model';

class Category extends Component {

    state = SelectedNode;

    onItemClick = event => {               
        this.setState({
            selectedNode: (event.item.text) ? event.item.text : '',
            selectedNodeIndex: (event.itemHierarchicalIndex) ? event.itemHierarchicalIndex : '' 
        })
        // event.item.selected = !event.item.selected;
        this.forceUpdate();
    }

    onExpandChange = event => {
        event.item.expanded = !event.item.expanded;
        this.forceUpdate();
    }

    handleCategory = type => {
        this.setState({
            categoryType: type
        })
        this.props.openModal()
    }

    manageCategory = type => {
        this.props.manageCategory(this.props.tree, this.state,type)
        this.props.closeModal();
    }

    componentDidMount(){
        this.props.getCategory();
    }

    handleInputChange(e) {
        console.log(e.id)
        this.setState({
          [e.id]: e.value
        })
    }

    render() {
        const { tree, modalState } = this.props
        const checkBoth = this.state.categoryType === 'add' || this.state.categoryType === 'edit'
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <Header headeTitle="Curriculum" />
                    </div>
                </div>          
                <div className="row justify-content-md-center">
                    <div className="col-sm-6 col-md-6 col-lg-6 adjust-top">
                        <h5>Category Management</h5>
                        <div className="card">
                            <div className="card-body">
                                <div className="col-lg-6 pull-left">
                                    { tree && (
                                        <TreeView
                                            data={tree}
                                            expandIcons={true}
                                            onExpandChange={this.onExpandChange}
                                            onItemClick={this.onItemClick}
                                            aria-multiselectable={false}
                                        />
                                    )}
                                </div>
                                <div className="col-lg-6 pull-right">
                                    { this.state.selectedNodeIndex && (                             
                                        <div className="pull-right">
                                            <button 
                                                type="button" 
                                                /* title={CURRICULUM_CONSTANT.BUTTON.CATEGORY.ADD} */ 
                                                className="btn btn-outline-primary btn-sm space" 
                                                onClick={() => this.handleCategory('add')}>
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                            { this.state.selectedNodeIndex !== '0' && (
                                                <>
                                                <button 
                                                type="button" 
                                                /* title={CURRICULUM_CONSTANT.BUTTON.CATEGORY.EDIT} */ 
                                                className="btn btn-outline-primary btn-sm space" 
                                                onClick={() => this.handleCategory('edit')}>
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                                </button>
                                                {/* <button 
                                                type="button" 
                                                
                                                className="btn btn-outline-primary btn-sm space" 
                                                onClick={() => this.manageCategory('delete')}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                                </button> */}
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal open={modalState} onClose={this.props.closeModal} center>
                        { checkBoth && (
                        <>
                        <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input id="selectedNode" type="text" 
                            className="form-control" placeholder="Enter Category" 
                            value={this.state.selectedNode} 
                            onChange={(e) => this.handleInputChange(e.target)} />
                        </div>
                        <button className="btn btn-outline-primary btn-sm" onClick={() => this.manageCategory(this.state.categoryType)}>{this.state.categoryType.toUpperCase()}</button>
                        </>
                        ) }
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        tree: state.category.tree,
        modalState: state.curriculum.openModal
    }
}
const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
        getCategory: () => dispatch(getCategory()),
        manageCategory: (tree, state, type) => dispatch(manageCategory(tree, state, type)),        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);

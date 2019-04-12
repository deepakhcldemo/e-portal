import React, { Component } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { TreeView } from "@progress/kendo-react-treeview";
import "@progress/kendo-theme-default/dist/all.css";

import Header from "../../components/layout/header/Header";
import "./styles.css";

import { getCategory, openModal, closeModal } from "./actions";

class Curriculum extends Component {
    selectedItem = null;
  
    componentDidMount() {
        this.props.getCategory();
    }
    
    onItemClick = async (event) => {               
        await this.selectCurrentNode(event);        
        this.forceUpdate();
    }

    selectCurrentNode(e){
        if (this.selectedItem)
        this.selectedItem.selected = false;
        e.item.selected = true;
        this.selectedItem = e.item;   
    }

    onExpandChange = event => {
        event.item.expanded = !event.item.expanded;
        this.forceUpdate();
    }
    
    render() {
        const { tree, modalState } = this.props;
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
                            <h5 className="card-title col-12 col-sm-12 col-md-12 col-lg-9 pull-left" />
                            <div className="col-12 col-sm-12 col-md-12 col-lg-3 pull-right">
                            <div className="pull-right">                                
                            </div>
                            </div>
                            <div className="clear" />
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            {tree && (
                                <TreeView
                                data={tree}
                                expandIcons={true}
                                onExpandChange={this.onExpandChange}
                                onItemClick={this.onItemClick}
                                aria-multiselectable={false}
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
                            <h5 className="card-title col-12 col-sm-12 col-md-12 col-lg-11 pull-left" />
                            <div className="col-12 col-sm-12 col-md-12 col-lg-1 pull-right" />
                        </div>
                        {/* <List/> */}
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
    tree: state.curriculum.tree,
    modalState: state.curriculum.openModal
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
    getCategory: () => dispatch(getCategory())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Curriculum);

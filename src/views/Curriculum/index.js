import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { TreeView } from '@progress/kendo-react-treeview'
import '@progress/kendo-theme-default/dist/all.css';
import FileUploader from 'react-firebase-file-uploader';

import Header from '../../components/layout/header/Header';
import Progress from './progress';
import {CurriculumModel} from './model';
import './styles.scss';

import { getCategory, getCurrentUser, saveFileMetaData } from './actions';

class Curriculum extends Component {
    state = CurriculumModel;
    selectedItem = null;

    componentDidMount = () =>  {
        this.props.getCategory();
        this.props.getCurrentUser();
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => this.setState({ isUploading: false });

    handleUploadSuccess = fileName => {
        this.setState({ progress: 100, isUploading: false }); 
        this.props.saveFileMetaData(fileName, this.props.uid);           
    };

    onItemClick = async event => {
        await this.selectCurrentNode(event);
        this.setState({
        selectedNode: event.item.text ? event.item.text : '',
        selectedNodeIndex: event.itemHierarchicalIndex
            ? event.itemHierarchicalIndex
            : ''
        });
        this.forceUpdate();
    };

    selectCurrentNode(e) {
        if (this.selectedItem) this.selectedItem.selected = false;
        e.item.selected = true;
        this.selectedItem = e.item;
    }

    onExpandChange = event => {
        event.item.expanded = !event.item.expanded;
        this.forceUpdate();
    };

    render() {
        const { tree, uid } = this.props;
        return (
        <div className='container-fluid'>
            <div className='row'>
            <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                <Header headeTitle='Curriculum' />
            </div>
            </div>
            <div className='row adjust-top'>
            <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                <div className='card'>
                <div className='card-body'>
                    <div className='col-3 pull-left border-right'>
                    <h6>Select Category</h6>
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
                    <div className='col-9 pull-right'>
                    <h6>Upload File</h6>
                    {this.state.selectedNode && (
                        <>
                            <form>
                            {(!this.state.isUploading && this.state.progress !== 100) && (
                                    <label
                                    style={{
                                        backgroundColor: 'steelblue',
                                        color: 'white',
                                        padding: 10,
                                        fontSize: '15px',
                                        borderRadius: 1,
                                        pointer: 'cursor'
                                    }}
                                    >
                                    Upload File                          
                                    <FileUploader
                                        hidden
                                        accept='video/*'
                                        storageRef={firebase.storage().ref(uid)}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess}
                                        onProgress={this.handleProgress}
                                    />
                                    </label>
                                )}
                                {this.state.isUploading && (
                                    <Progress progress={this.state.progress} />
                                )}
                                
                                                                
                            </form>
                        </>
                    )}
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
    uid: state.curriculum.uid,
    tree: state.curriculum.tree,
    modalState: state.curriculum.openModal,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCategory: () => dispatch(getCategory()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    saveFileMetaData: (fileName, uid) => dispatch(saveFileMetaData(fileName,uid))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Curriculum);

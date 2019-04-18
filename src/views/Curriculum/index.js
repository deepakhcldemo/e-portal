import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import '@progress/kendo-theme-default/dist/all.css';
import FileUploader from 'react-firebase-file-uploader';

import Progress from './progress';
import {CurriculumModel} from './model';
import './styles.scss';

import { saveFileMetaData } from './actions';

class Curriculum extends Component {
    state = CurriculumModel;

    componentDidMount = () => {
        this.setState({
            userDetails: JSON.parse(localStorage.getItem('userProfile'))
        })
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => this.setState({ isUploading: false });

    handleVideoUploadSuccess = fileName => {
        this.setState({ progress: 100, isUploading: false, video: true }); 
        this.props.saveFileMetaData(fileName, this.state.userDetails, '', '', 'video');           
    };

    handleThumbUploadSuccess = fileName => {
        this.setState({ progress: 100, isUploading: false, thumbnail : false }); 
        this.props.saveFileMetaData(fileName, this.state.userDetails, this.props.docRef, '', 'thumb');           
    };

    handleInputChange = e => {
        this.setState({
            [e.id]: e.value 
        })
    }

    handleSubmit = (e) => {
        const fields = {
            title: this.state.title,
            tags: this.state.tags,
            desc: this.state.desc
        }
        this.props.saveFileMetaData('', this.state.userDetails, this.props.docRef, fields, 'metadata')
        e.preventDefault();
    }
    
    render() {
        return (
            <div className='col-12'>
                <h6>Upload File</h6>                        
                {this.state.userDetails && (            
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        {this.state.isUploading && (
                            <><br/>
                            <Progress progress={this.state.progress} />
                            <br/></>
                        )}
                        {(!this.state.video && !this.state.isUploading) && (
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
                                Upload                          
                                <FileUploader
                                    hidden
                                    accept='video/*'
                                    storageRef={firebase.storage().ref(this.state.userDetails.userId)}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleVideoUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </label>
                        )}
                        {this.state.video && (
                            <>
                            <div className="form-group">
                            {this.state.thumbnail && (
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
                                Upload Thumbnail                         
                                <FileUploader
                                    hidden
                                    accept='image/*'
                                    filename={file => 'thumb_' + file.name.split('.')[1] }
                                    storageRef={firebase.storage().ref(this.state.userDetails.userId)}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleThumbUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                                </label>
                            )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input value={this.state.title} type="text" className="form-control" id="title" placeholder="Title" onChange={(e) => this.handleInputChange(e.target)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tags">Tags</label>
                                <input value={this.state.tags} type="text" className="form-control" id="tags" placeholder="Math, Science" onChange={(e) => this.handleInputChange(e.target)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="desc">Description</label>
                                <textarea value={this.state.desc} className="form-control" id="desc" rows="3" onChange={(e) => this.handleInputChange(e.target)}>                            
                                </textarea>
                            </div>
                            <button type="submit" disabled={this.state.thumbnail} className="btn  btn-outline-primary mb-2">Publish</button>
                            </>
                        )}                    
                    </form>
                )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log(state);
  return {
    modalState: state.curriculum.openModal,
    docRef: state.curriculum.docRef
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveFileMetaData: (fileName, user, docRef, fields, type) => 
    dispatch(saveFileMetaData(fileName, user, docRef, fields, type))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Curriculum);

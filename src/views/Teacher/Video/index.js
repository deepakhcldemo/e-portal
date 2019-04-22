import React, { Component } from 'react'
import { TEACHER_DASHBOARD_LINKS } from './../../../constant/Constant'
import HeaderHome from '../../../components/layout/header/HeaderHome';
import Navbar from './../../../shared/components/Navbar'
import Filter from './../../../shared/components/Filter'
import TopVideo from './../TopVideo/TopVideo'
import Curriculum from './../../Curriculum/index'
import { getAllCategory } from '../../../database/dal/firebase/categoryDal';
import { getCurriculumFromDB } from '../../../database/dal/firebase/curriculumDal'

class Video extends Component {

    state = {
        upload: false,
        content: '',
        userDetails: '',
        filter: ''
    }
    componentWillMount = () => {
        this.setState({
            userDetails: JSON.parse(localStorage.getItem('userProfile'))
        })
    }

    componentDidMount = () => {
        getCurriculumFromDB(this.state.userDetails.userId).then(querySnapshot => {
            let content = [];
            querySnapshot.forEach(doc => {
                content.push(Object.assign({id: doc.id},doc.data()));
            });
            this.setState({content});
        });
        getAllCategory().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const category = [...doc.data().subjects];
              this.setState({ category });
            });
          });
    }
    
    handleUpload = () => {
        this.setState({
            upload: !this.state.upload
        })
    }

    handleError = (error) => {
        console.log(error)
    }

    handleSuccess = (res) => {
        console.log(res)
    }

    handleFilter = (content) => {
        this.setState({
            filter: content
        })
    }

    render = () => {  
        return (
            <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <HeaderHome headeTitle="Teacher Dashboard" dashboardLinks={TEACHER_DASHBOARD_LINKS}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 main-wrapper">
                        {!this.state.upload && (  
                            <>                          
                            <Filter content={this.state.content} filterContent={this.handleFilter} />
                            <TopVideo heading="My Videos" videoDetails={this.state.filter ? this.state.filter : this.state.content}>
                                <button onClick={this.handleUpload} className="btn home-header-text-link-status" title="Upload Video"><i className="fas fa-plus"></i> Add Video</button>
                            </TopVideo>
                            </>
                        )}
                        {this.state.upload && (
                            <Curriculum 
                                heading="UPLOAD VIDEO" 
                                isUploadThumb={true} 
                                userDetails={this.state.userDetails} 
                                category={this.state.category} 
                                handleError={this.handleError} 
                                handleSuccess={this.handleSuccess}
                                >
                                <button onClick={this.handleUpload} className="btn" style={ {backgroundColor: '#232838', color: '#fff'}} title="close">Close</button>
                            </Curriculum>
                        )}                        
                    </div>
                </div>
                <div className="row">
                    <Navbar links={TEACHER_DASHBOARD_LINKS}/>
                </div>
            </div>            
            </>
        );
    }
}
export default Video

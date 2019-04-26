import React, { Component } from "react";

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import HeaderHome from "../../components/layout/header/HeaderHome";
import Navbar from "../../shared/components/Navbar";
import Filter from "../../shared/components/Filter";

import VideoList from "./VideoList";
import Curriculum from "./../Curriculum";

import { getAllCategory } from "../../database/dal/firebase/categoryDal";
import { getCurriculumFromDB } from "../../database/dal/firebase/curriculumDal";

import {VIDEO_TABS} from "./../../constant/Constant"

class Video extends Component {
  state = {
    filter: "",
    content: "",
    userDetails: "",
    tabs: [],
    upload: false,
    tabKey: "pendingreview",
  };

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userProfile")),
    })
  };

  componentDidMount = () => {
    this.setState({
      tabs: VIDEO_TABS[this.state.userDetails.role.toLowerCase()]
    });
    getCurriculumFromDB(this.state.userDetails.userId).onSnapshot(
      querySnapshot => {
        let content = [];
        querySnapshot.forEach(doc => {
          content.push(Object.assign({ id: doc.id }, doc.data()));
        });
        this.setState({ content });
      }
    );
    getAllCategory().onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        const category = [...doc.data().subjects];
        this.setState({ category });
      });
    });
  };

  handleUpload = () => {
    this.setState({
      upload: !this.state.upload
    });
  };

  handleError = error => {
    console.log(error);
  };

  handleSuccess = res => {
    if (res) {
      this.setState({
        upload: !this.state.upload
      });
    }
  };

  handleFilter = content => {
    this.setState({
      filter: content
    });
  };
  handleKey = key => {
    this.setState({tabKey: key})
  }

  render = () => {
    const {tabKey, tabs, upload, filter, content, userDetails, category} = this.state
    return (
      <>
        <div className="container-fluid">
          <HeaderHome
            headeTitle="Teacher Dashboard"
          />
          <div className="content-container main-wrapper">
            {!upload && (
              <>
                <Filter
                  content={content}
                  filterContent={this.handleFilter}
                />
                <Tabs
                  id="video-tabs"
                  activeKey={tabKey}
                  onSelect={key => this.handleKey(key)}
                >
                  {tabs && tabs.map((tab, ind) => {
                    return (
                      <Tab key={ind} eventKey={tab.id} title={tab.name}>
                        <VideoList
                          heading={tab.name}
                          videoDetails={
                            filter ? filter : content
                          }
                        >
                          <button
                            onClick={this.handleUpload}
                            className="btn home-header-text-link-status"
                            title="Upload Video"
                          >
                          <i className="fas fa-plus" /> Add Video
                          </button>
                        </VideoList>
                      </Tab>
                    )
                  })}
                </Tabs>
              </>
            )}
            {upload && (
              <Curriculum
                heading="UPLOAD VIDEO"
                isUploadThumb={true}
                userDetails={userDetails}
                category={category}
                handleError={this.handleError}
                handleSuccess={this.handleSuccess}
              >
                <button
                  onClick={this.handleUpload}
                  className="btn"
                  style={{ backgroundColor: '#232838', color: '#fff' }}
                  title="close"
                >
                  Close
                </button>
              </Curriculum>
            )}
          </div>
          <div className="col-12">
            <Navbar />
          </div>
        </div>
      </>
    );
  };
}
export default Video;

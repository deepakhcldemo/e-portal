import React, { Component } from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import HeaderHome from "../../components/layout/header/HeaderHome";
import Navbar from "../../shared/components/Navbar";
import Filter from "../../shared/components/Filter";

import VideoList from "./VideoList";
import Curriculum from "./../Curriculum";

import { getAllCategory } from "../../database/dal/firebase/categoryDal";
import { getCurriculumFromDB } from "../../database/dal/firebase/curriculumDal";
import { getNotificationsFromDB } from "../../database/dal/firebase/studentDal";

import { VIDEO_TABS } from "./../../constant/Constant";
import { link } from "fs";
import "./video.scss";
// import notifications from "../Student/Notification/notifications";

class Video extends Component {
  state = {
    filter: "",
    content: "",
    userDetails: "",
    tabs: [],
    upload: false,
    tabKey: "pendingreview"
  };

  componentWillMount = () => {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("userProfile"))
    });
  };

  componentDidMount = () => {
    this.setState({
      tabs: VIDEO_TABS[this.state.userDetails.role.toLowerCase()]
    });
    this.getContent();
    getAllCategory().onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        const category = [...doc.data().subjects];
        this.setState({ category });
      });
    });
  };

  getContent = async () => {
    if (this.state.tabKey === "myvideo") {
      await this.getCurriculum();
    } else {
      await this.getNotifications();
    }
  };

  getCurriculum = () => {
    const { userDetails } = this.state;
    getCurriculumFromDB(userDetails.userId).onSnapshot(querySnapshot => {
      let content = [];
      querySnapshot.forEach(doc => {
        content.push(Object.assign({ id: doc.id }, doc.data()));
      });
      this.setState({ content });
    });
  };

  getNotifications = () => {
    const { userDetails, tabKey } = this.state;
    getNotificationsFromDB(userDetails.userId, userDetails.role).onSnapshot(
      querySnapshot => {
        let content = [];
        querySnapshot.forEach(doc => {
          content.push(Object.assign({ id: doc.id }, doc.data()));
        });
        if (content.length > 0) {
          content = content.filter(list => {
            if (tabKey === "reviewed") {
              return list.sstatus && list.tstatus;
            } else if (tabKey === "pendingreview") {
              return list.sstatus && !list.tstatus;
            } else if (tabKey === "rejected") {
              return list.sstatus === false;
            }
          });
        }
        this.setState({ content });
      }
    );
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

  handleKey = async key => {
    await this.setState({ tabKey: key });
    this.getContent();
  };

  render = () => {
    const {
      tabKey,
      tabs,
      upload,
      filter,
      content,
      userDetails,
      category
    } = this.state;

    return (
      <>
        <div className="container-fluid">
          <HeaderHome headeTitle="My Video(s)" />
          <div className="content-container main-wrapper col-12">
            {!upload && (
              <>
                <Filter content={content} filterContent={this.handleFilter} />
                <Tabs
                  id="video-tabs"
                  activeKey={tabKey}
                  onSelect={key => this.handleKey(key)}
                >
                  {tabs &&
                    tabs.map((tab, ind) => {
                      return (
                        <Tab key={ind} eventKey={tab.id} title={tab.name}>
                          <VideoList
                            heading={tab.name}
                            videoDetails={filter ? filter : content}
                          >
                            {tabKey === "myvideo" &&
                              userDetails.role === "Teacher" && (
                                <button
                                  style={{ color: "#fff" }}
                                  onClick={this.handleUpload}
                                  className="btn"
                                  title="Upload Video"
                                >
                                  <i className="fas fa-plus" />
                                  <span className="home-header-text-link-status">
                                    &nbsp;Add Video
                                  </span>
                                </button>
                              )}
                          </VideoList>
                        </Tab>
                      );
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
                {}
                <button
                  onClick={this.handleUpload}
                  className="btn"
                  style={{ backgroundColor: "#232838", color: "#fff" }}
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

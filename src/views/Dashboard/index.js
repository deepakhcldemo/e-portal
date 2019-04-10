import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import { connect } from "react-redux";
import { resolve } from "q";
import Carousel from "../../components/carousel/Carousel";
import Modal from "../../components/carousel/Modal";

class Dashboard extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      classessName: [],
      isOpen: false,
      carouselImageType: "video",
      carouselImage: ""
    };
  }

  toggleModal = (imageType, imageSrc) => {
    this.setState({
      isOpen: !this.state.isOpen,
      carouselImageType: imageType,
      carouselImage: imageSrc
    });
  };

  toggleModalClose = () => {
    console.log("Close");
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  createEvent = () => {
    this.props.history.push("/createevent");
  };

  render() {
    let displayModalstring = "";
    if (this.state.carouselImageType == "image") {
      // <video width="640" height="480" src={this.state.carouselImage} controls></video>
      displayModalstring = <img src={this.state.carouselImage} alt="boardBG" />;
    } else {
      displayModalstring = (
        <iframe
          width="100%"
          src={this.state.carouselImage}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Header headeTitle="Dashboard" />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <button className="btn btn-primary" onClick={this.createEvent}>
                Create Event
              </button>
            </div>
            <div className="col-9">
              <div className="col-12 content-container">
                {/* <button onClick ={this.createClass}>Create Class ...</button> */}
                {/* <Classes></Classes> */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 content-container">
              <Carousel
                toggleModal={(imageType, imageSrc) =>
                  this.toggleModal(imageType, imageSrc)
                }
              />
              <Modal show={this.state.isOpen} onClose={this.toggleModalClose}>
                {displayModalstring}
              </Modal>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    modalSata: state.classes
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import { connect } from "react-redux";
import { resolve } from "q";
import Carousel from 'react-bootstrap/Carousel';
import Slider from '../../components/slider/Slider';

// import Carousel from "../../components/carousel/Carousel";
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
            <div className="col-12 main-wrapper">
              <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.pinimg.com/originals/35/5d/65/355d65da2e1dc28b3399951765bc5fb1.jpg"
                  alt="First slide"
                />
                {/* <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.pinimg.com/originals/35/5d/65/355d65da2e1dc28b3399951765bc5fb1.jpg"
                  alt="Third slide"
                />

                {/* <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption> */}
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.pinimg.com/originals/35/5d/65/355d65da2e1dc28b3399951765bc5fb1.jpg"
                  alt="Third slide"
                />

                {/* <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption> */}
              </Carousel.Item>
            </Carousel>
            </div>
          </div>

          <div className="row dark-bg">
            <div className="col-12">
             
              <Slider>
                <h3 className="mt-30">Top <span>></span></h3>
              </Slider>

              <Slider>
                <h3 className="mt-30">Newly added videos <span>></span></h3>
              </Slider>
              
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

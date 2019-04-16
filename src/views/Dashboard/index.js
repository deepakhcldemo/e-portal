import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import { connect } from "react-redux";
import { resolve } from "q";
import Carousel from 'react-bootstrap/Carousel';
import Slider from '../../components/slider/Slider';
import { getCurriculum } from '../../components/carousel/action';

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

  componentDidMount(){
    this.props.getCurriculum();
  }

  toggleModalClose = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  createEvent = () => {
    this.props.history.push("/createevent");
  };

  render() {
    // let displayModalstring = "";
    // if (this.state.carouselImageType == "image") {
    //   // <video width="640" height="480" src={this.state.carouselImage} controls></video>
    //   displayModalstring = <img src={this.state.carouselImage} alt="boardBG" />;
    // } else {
    //   displayModalstring = (
    //     <iframe
    //       width="100%"
    //       src={this.state.carouselImage}
    //       frameBorder="0"
    //       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    //       allowFullScreen
    //     />
    //   );
    // }

    const { carouselRows } = this.props;
    const carouselAwaitingRows = carouselRows;
    var awaitingRows = carouselAwaitingRows.filter(function (carouselAwaitingRow) {
      return !carouselAwaitingRow.awaiting;
    });
    // console.log('--carouselAwaitingRows--', awaitingRows);

    const listTop10Items = carouselRows;
    listTop10Items.sort((a,b) => b.rating_count - a.rating_count);

    const listNewlyItems = carouselRows;
    listNewlyItems.sort((a,b) => b.created_date - a.created_date);

    const trendingItems = carouselRows;
    trendingItems.sort((a,b) => b.views - a.views);
   
    const listAwaitingItems = awaitingRows.map((awaitingRows, index) =>
      <Carousel.Item key={index}>
          <iframe key={index} className="d-block w-100 h-100" src={awaitingRows.src} frameBorder="0"></iframe><div key="layer{index}" className="item-over layer"></div>
      </Carousel.Item>
    );

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
               {/* <Carousel.Item>                
                <img
                  className="d-block w-100"
                  src="https://i.pinimg.com/originals/35/5d/65/355d65da2e1dc28b3399951765bc5fb1.jpg"
                  alt="First slide"
                />                
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.pinimg.com/originals/35/5d/65/355d65da2e1dc28b3399951765bc5fb1.jpg"
                  alt="Third slide"
                />                
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.pinimg.com/originals/35/5d/65/355d65da2e1dc28b3399951765bc5fb1.jpg"
                  alt="Third slide"
                />
              </Carousel.Item> */}
              {listAwaitingItems}
            </Carousel>
            </div>
          </div>

          <div className="row dark-bg">
            <div className="col-12">
             
              <Slider carouselRecords={listTop10Items}>
                <h3 className="mt-30">Top 10 <i className="fas fa-chevron-right"></i></h3>
              </Slider>

              <Slider  carouselRecords={listNewlyItems}>
                <h3 className="mt-30">Newly added videos <i className="fas fa-chevron-right"></i></h3>
              </Slider>

              <Slider carouselRecords={trendingItems}>
                <h3 className="mt-30">Trending videos <span>&gt;</span></h3>
              </Slider>               
            </div>
          </div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>

          
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    modalSata: state.classes,
    carouselRows: state.carouselStore.carouselData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurriculum: () => dispatch(getCurriculum()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

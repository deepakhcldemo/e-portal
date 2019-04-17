import React, { Component } from "react";
import HeaderHome from "../../components/layout/header/HeaderHome";
import { connect } from "react-redux";
import Carousel from 'react-bootstrap/Carousel';
import Slider from '../../components/slider/Slider';
import { getCurriculum, getTeacher } from './actions';
import GLOBAL_VARIABLES from '../../config/Config';

class Home extends Component {
 
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
    this.props.getTeacher();
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
    const { carouselRows, teacherCarouselRows } = this.props;

    // console.log('--teacherCarouselRows--', teacherCarouselRows);

    const carouselAwaitingRows = carouselRows;
    var awaitingRows = carouselAwaitingRows.filter(function (carouselAwaitingRow) {
      return !carouselAwaitingRow.awaiting;
    });
    
    const listTop10Items = teacherCarouselRows;
    // var listTop10Items_1 = listTop10Items.sort((a,b) => a.rating_count - b.rating_count);
    // console.log('listTop10Items', listTop10Items_1);
    
    let listNewlyItems = carouselRows;
    var listNewlyItems_1 = listNewlyItems.sort((a,b) => a.created_date.seconds - b.created_date.seconds);
    // console.log('listNewlyItems',listNewlyItems)

    let trendingItems = carouselRows;
    trendingItems = trendingItems.sort((a,b) => b.views - a.views);
    // console.log('trendingItems',trendingItems)

    const listAwaitingItems = awaitingRows.map((awaitingRows, index) =>
      <Carousel.Item key={index}>
          {/* <iframe key={index} className="d-block w-100 h-100" src={awaitingRows.src} frameBorder="0"></iframe><div key="layer{index}" className="item-over layer"></div> */}
          <img src="https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg" className="d-block w-100"/>
      </Carousel.Item>
    );
    
    return (
      // {yourvairable && (<h1></h1>)}
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <HeaderHome headeTitle="Dashboard" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 main-wrapper content-container--background">
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
            <div className="col-12 content-container--background">
             
              <Slider listTop10Items={listTop10Items}>
                <h3 className="mt-30">{GLOBAL_VARIABLES.TOP10_TUTOR} <i className="fas fa-chevron-right"></i></h3>
              </Slider>

              <Slider listNewlyItems={listNewlyItems}>
                <h3 className="mt-30">{GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS} <i className="fas fa-chevron-right"></i></h3>
              </Slider>

              {/* <Slider trendingItems={trendingItems}>
                <h3 className="mt-30">{GLOBAL_VARIABLES.TRENDING_VIDEOS} <span>&gt;</span></h3>
              </Slider>                */}
            </div>
          </div>
          <div className="row">
            <div className="col-12 content-container--background">&nbsp;</div>
          </div>
          <div className="row">
            <div className="col-12 content-container--background">&nbsp;</div>
          </div>

          
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    carouselRows: state.homeReducerStore.carouselData,
    teacherCarouselRows: state.homeReducerStore.teacherCarouselData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurriculum: () => dispatch(getCurriculum()),
    getTeacher: () => dispatch(getTeacher()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

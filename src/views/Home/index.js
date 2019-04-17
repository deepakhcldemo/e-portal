import React, { Component } from 'react';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import Slider from '../../components/slider/Slider_Santosh';
import { getBanner, getCurriculum, getTeacher } from './actions';
import GLOBAL_VARIABLES from '../../config/config';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classessName: [],
      isOpen: false,
      carouselImageType: 'video',
      carouselImage: ''
    };
  }

  toggleModal = (imageType, imageSrc) => {
    this.setState({
      isOpen: !this.state.isOpen,
      carouselImageType: imageType,
      carouselImage: imageSrc
    });
  };

  componentDidMount() {
    this.props.getBanner();
    this.props.getCurriculum();
    this.props.getTeacher();
  }

  toggleModalClose = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  createEvent = () => {
    this.props.history.push('/createevent');
  };

  render() {
    const { bannerRows, carouselRows, teacherCarouselRows } = this.props;
    
    // const carouselAwaitingRows = carouselRows;
    // var awaitingRows = carouselAwaitingRows.filter(function(
    //   carouselAwaitingRow
    // ) {
    //   return !carouselAwaitingRow.awaiting;
    // });

    let listTop10Items = teacherCarouselRows;

    if(listTop10Items && listTop10Items.rating){
      listTop10Items = listTop10Items.sort((a,b) => b.rating - a.rating);
    }
    
    let listNewlyItems = carouselRows;

    if(listNewlyItems && listNewlyItems.created_date){
      listNewlyItems.sort((a,b) => b.created_date.seconds - a.created_date.seconds);
    }

    let trendingItems = carouselRows;

    if(trendingItems && trendingItems.views){
      trendingItems = trendingItems.sort((a, b) => b.views - a.views);
    }
    
    const studentsReview = [
                    {
                      'name': 'Borivoje', 
                      'profile_image': 'https://i.pinimg.com/originals/35/5d/65/355d65da2e1dc28b3399951765bc5fb1.jpg',
                      'comment': 'This plateform is a life saver. I dont have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I am really close.'
                    },
                    {
                      'name': 'Diana Hayden', 
                      'profile_image': 'http://nrsinstitute.com/wp-content/uploads/2014/05/edu-oatcert.jpg',
                      'comment': 'I believe in lifelong learning and it is a great place to learn from experts. I have learned a lot and recommend it to all my friends.'
                    },
                    {
                      'name': 'Ria Hazal', 
                      'profile_image': 'https://media.gq.com/photos/5c115439a15f8517197598ac/16:9/w_1280%2Cc_limit/america-school-Teacher-guns-GQ.jpg',
                      'comment': 'The courses are fantastic and the instructors are so fun and knowledgeable. I only wish we found it sooner'
                    },
                    {
                      'name': 'Diana Hayden', 
                      'profile_image': 'http://nrsinstitute.com/wp-content/uploads/2014/05/edu-oatcert.jpg',
                      'comment': 'I believe in lifelong learning and it is a great place to learn from experts. I have learned a lot and recommend it to all my friends.'
                    },
                    {
                      'name': 'Ria Hazal', 
                      'profile_image': 'https://media.gq.com/photos/5c115439a15f8517197598ac/16:9/w_1280%2Cc_limit/america-school-Teacher-guns-GQ.jpg',
                      'comment': 'The courses are fantastic and the instructors are so fun and knowledgeable. I only wish we found it sooner'
                    }
                  ];
    
    let listAwaitingItems = '';
    
    if(bannerRows && bannerRows.length > 0){
      listAwaitingItems = bannerRows.map((bannerRow, index) =>
        <Carousel.Item key={index}>
          {/* <iframe key={index} className="d-block w-100 h-100" src={awaitingRow.src} frameBorder="0"></iframe><div key="layer{index}" className="item-over layer"></div> */}
          
          { bannerRow.banner_image && 
            <img
              src={bannerRow.banner_image}
              className="d-block w-100"
            />
          }
        </Carousel.Item>
      );
    }

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
                <h3 className="mt-30">
                  {GLOBAL_VARIABLES.TOP10_TUTOR}
                  <i className="fas fa-chevron-right" />
                </h3>
              </Slider>              

              <Slider listNewlyItems={listNewlyItems}>
                <h4 className="mt-30 pad10">{GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS} <i className="fas fa-chevron-right"></i></h4>
              </Slider>

              <Slider studentsReview={studentsReview}>
                <h4 className="mt-30 pad10">{GLOBAL_VARIABLES.STUDENTS_REVIEW} <span>&gt;</span></h4>
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
    bannerRows: state.homeReducerStore.bannerData,
    carouselRows: state.homeReducerStore.carouselData,
    teacherCarouselRows: state.homeReducerStore.teacherCarouselData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBanner: () => dispatch(getBanner()),
    getCurriculum: () => dispatch(getCurriculum()),
    getTeacher: () => dispatch(getTeacher())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

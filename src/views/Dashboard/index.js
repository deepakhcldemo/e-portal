import React, { Component } from "react";
import Header from "../../components/layout/header/Header";
import { connect } from "react-redux";
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

  /**
     * customSort is used for sorting an array
     * @param arrayList : array which we need to sort
     * @param sortBy : element by which we want to sort
     * @param orderBy : this parameter should be ASC or DESC
     * @param sortByAnotherValue : another element by which we want to sort
     */
    customSort(arrayList, sortBy, orderBy, sortByAnotherValue = '') {
      arrayList.sort(function (valueList1, valueList2) {
          let value1 = '';
          let value2 = '';

          if (sortByAnotherValue) {
              if (typeof (valueList1[sortBy][sortByAnotherValue]) === 'string') {
                  value1 = valueList1[sortBy][sortByAnotherValue].toLowerCase;
                  value2 = valueList2[sortBy][sortByAnotherValue].toLowerCase;
              } else {
                  value1 = valueList1[sortBy][sortByAnotherValue];
                  value2 = valueList2[sortBy][sortByAnotherValue];
              }
          } else {
              // value1 = valueList1[sortBy].toLowerCase;
              // value2 = valueList2[sortBy].toLowerCase;

              value1 = valueList1[sortBy];
              value2 = valueList2[sortBy];
          }
          if (orderBy.toLowerCase === 'asc') {
              if (value1 < value2) { return -1;}
              if (value1 > value2) { return 1;}
          } else {
              if (value2 < value1) { return -1;}
              if (value2 > value1) { return 1;}
          }
          return 0;
      });
      return arrayList;
  }

  render() {
    const { carouselRows } = this.props;
    const carouselAwaitingRows = carouselRows;
    var awaitingRows = carouselAwaitingRows.filter(function (carouselAwaitingRow) {
      return !carouselAwaitingRow.awaiting;
    });
    // console.log('--carouselAwaitingRows--', carouselRows);

    let listTop10Items = carouselRows;
    var listTop10Items_1 = this.customSort(listTop10Items, 'rating_count', 'desc');
    // console.log('listTop10Items', listTop10Items_1);
    
    let listNewlyItems = carouselRows;
    var listNewlyItems_1 = listNewlyItems.sort((a,b) => a.created_date.seconds - b.created_date.seconds);
    // console.log('listNewlyItems',listNewlyItems)

    let trendingItems = carouselRows;
    trendingItems = trendingItems.sort((a,b) => b.views - a.views);
    // console.log('trendingItems',trendingItems)

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

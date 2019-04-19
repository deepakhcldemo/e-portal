import React, { Component } from 'react';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
// import Slider from '../../components/slider/Slider_Santosh';
// import Slider from '../../components/slider/Slider_new';
import { getBanner, getCurriculum, getTeacher } from './actions';
import { getBannerFromDB, getCurriculumFromDB,getTeacherFromDB } from './../../database/dal/firebase/homeDal';
import GLOBAL_VARIABLES from '../../config/config';
import Slider from "react-slick";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classessName: [],
      isOpen: false,
      carouselImageType: 'video',
      carouselImage: '',
      bannerRows: [],
      carouselTop10Items:[],
      carousellistNewlyItems:[],
    };
  }

  componentWillReceiveProps = (newProps) => {
    // console.log(newProps)
  }

  componentDidMount = ()=> {
    
    getBannerFromDB().then( querySnapshot =>{
      let bannerData = []; 
      querySnapshot.forEach(doc => {
        bannerData.push(doc.data());
      });
      this.setState({
        bannerRows: bannerData
      })
    }); 
    
    getTeacherFromDB().then(querySnapshot => {
      let techerData = []; 
      querySnapshot.forEach(doc => {
        techerData.push(doc.data());       
      })
      this.setState({
        carouselTop10Items: techerData
      })
    }) 

    getCurriculumFromDB().then(querySnapshot => {
      let currData = []; 
      querySnapshot.forEach(doc=> {
        currData.push(doc.data());       
      });

      if(currData.length > 0){
        this.setState({
          carousellistNewlyItems: currData
      })
     }  
    });       
  }

  createEvent = () => {
    this.props.history.push('/createevent');
  };

  daysBetween(date1_seconds, date2_seconds) {
    if (date1_seconds && date2_seconds) {
      const one_day = 60 * 60 * 24;
      var difference_ms = Math.abs(date1_seconds - date2_seconds);
      return Math.round(difference_ms / one_day);
    } else {
      return "";
    }
  }

  createChildren = (records) =>{
    const carouselRows = records.map((carouselRecord, index) => {
      const moreSymbol = "...";
      const today = Date.now() / 1000; // convert into second
      var noOfDays = this.daysBetween(
        carouselRecord.createdOn ? carouselRecord.createdOn.seconds : carouselRecord.created_date?(carouselRecord.created_date.seconds):(""),
        today
      );

      let title = "";
      let profileImg = "";
      let rating = "";

      if (carouselRecord.firstName) {          
        title = carouselRecord.firstName;

        if (carouselRecord.lastName){
            title += ' '+ carouselRecord.lastName;
        }
      } else if (carouselRecord.title) {
        title = carouselRecord.title;
      }

      if (carouselRecord.thumb) {
        profileImg = carouselRecord.thumb;
      } else {
        if (carouselRecord.gender === 'Female') {
            profileImg = "https://i0.wp.com/www.antgibbz.com/wp-content/uploads/2016/05/person-placeholder-200x200.jpg?ssl=1";
        } if (carouselRecord.gender === 'Male') {
            profileImg = "https://tricityescaperooms.com/wp-content/uploads/2018/01/person-placeholder-male-5.jpg";
        }
      }

      if (carouselRecord.rating) {
        rating = carouselRecord.rating;
      }

      if (carouselRecord.views) {
        rating = carouselRecord.views;
      }

      return (
        <div key={index} className="vd-wrapper  col-xs-12 padR10">
          <a href="#" title={title}>
            <div 
              key={index}
              style={{ height: 150, background: "#000" }}
              className="border_1px"
            >
              {/* <iframe key={index} className="d-block w-100" src={carouselRecord.src} frameBorder="0"></iframe><div key="layer{index}" className="item-over layer"></div> */}
              <img src={profileImg} />
            </div>

            <div className="vd-content">
              <h5>
                {title.length > 50
                  ? title.substring(0, 50) + moreSymbol
                  : title}{" "}
                {/* <i className="fas fa-ellipsis-v" /> */}
              </h5>
              <p>
                { rating && 'Rating ' + rating + ' and' }  
                { (noOfDays || noOfDays === 0) && ' Registered ' + noOfDays + ' days ago' }  
              </p>
            </div>
          </a>
        </div>
      );
    });

    return carouselRows;
  }

  studentsReviewChildren = (records) =>{
    const studentsReview = records.map((carouselRecord, index) => {
      const moreSymbol = "...";
      const stopSymbol = ".";
      return (
        <div key={index} className="vd-wrapper border_1px padR10">
          <a href="#" title={carouselRecord.name}>
            <div
              key={index}
              className="pad5 left profile_img_review">
              <img src={carouselRecord.profile_image} />
            </div>
            <div className="pad5 left label-color">
              <h5>
                {carouselRecord.name.length > 50
                  ? carouselRecord.name.substring(0, 50) + moreSymbol
                  : carouselRecord.name}
              </h5>
            </div>
            <div className="clear" />
            <p className="pad5 label-color">
              {carouselRecord.comment.length > 125
                ? carouselRecord.comment.substring(0, 125) + moreSymbol
                : carouselRecord.comment + stopSymbol}
            </p>
          </a>
        </div>
      );
    });

    return studentsReview;
  }

  render() {
    const { bannerRows, carouselTop10Items,  carousellistNewlyItems} = this.state;

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
    if(bannerRows && bannerRows.length >0){
     
      listAwaitingItems = bannerRows.map((bannerRow, index) =>
        <div key={index}>          
          { bannerRow.banner_image && 
            <img
              src={bannerRow.banner_image}
              className="d-block w-100"
            />
          }
        </div>
      );
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };

    const settingsTop10 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: (carouselTop10Items.length > 5)? (5): (carouselTop10Items.length),
      slidesToScroll: 1,
    };

    const settingsNewlyItems = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: (carousellistNewlyItems.length > 5)? (5): (carousellistNewlyItems.length),
      slidesToScroll: 1,
      autoplay:true
    };

    const settingsStudentsReview = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: (studentsReview.length > 5)? (5): (studentsReview.length),
      slidesToScroll: 1,
      autoplay:true
    };
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <HeaderHome headeTitle="Dashboard" />
          </div>
        </div>
       
        <div className="col-12 content-container--background">
          <div style={{background: "#FFF",textAlign: "center"}}>
            <Slider {...settings}>
              {listAwaitingItems}
            </Slider>
          </div>
        </div>
        
        { carouselTop10Items.length > 0 && 
        <div className="col-12 content-container--background">
        <h3 className="mt-30"> {GLOBAL_VARIABLES.TOP10_TUTOR} <i className="fas fa-chevron-right" /></h3>
          <div style={{background: "#FFF",textAlign: "center"}}>
            <Slider {...settingsTop10}>
            {this.createChildren(carouselTop10Items)}
            </Slider>
          </div>
        </div>
        }

        { carousellistNewlyItems.length > 0 && 
        <div className="col-12 content-container--background">
          <h3 className="mt-30">{GLOBAL_VARIABLES.CATEGORYWISE_VIDEOS} <i className="fas fa-chevron-right"></i></h3>
          <div style={{background: "#FFF",textAlign: "center"}}>
            <Slider {...settingsNewlyItems}>
            {this.createChildren(carousellistNewlyItems)}
            </Slider>
          </div>
        </div>
        }

        {studentsReview.length > 0 && 
          <div className="col-12 content-container--background">
          <h3 className="mt-30 pad10">{GLOBAL_VARIABLES.STUDENTS_REVIEW} <i className="fas fa-chevron-right"></i></h3>
          <div style={{background: "#FFF",textAlign: "center"}}>
            <Slider {...settingsStudentsReview}>
            {this.studentsReviewChildren(studentsReview)}
            </Slider>
          </div>
        </div> 
        }

        <div className="row">
            <div className="col-12 content-container--background">&nbsp;</div>
        </div>
        <div className="row">
          <div className="col-12 content-container--background">&nbsp;</div>
        </div> 

      </div>     
    );
  }
}
const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
   
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

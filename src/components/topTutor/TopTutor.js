import React, { Component } from 'react';
import { handleResize } from '../../shared/library/window_resize';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import GLOBAL_VARIABLES from '../../config/config';

class TopTutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfCarouselImage: "",
    };
  }  
  
  componentWillUnmount() {    
    window.removeEventListener("resize",  handleResize);    
  }
  
  componentDidMount = ()=> {
          
    handleResize( (prop)=>{
      this.setState({
        noOfCarouselImage: prop.noOfCarouselImage
        }
      )
    })
    window.addEventListener("resize", ()=> {
      handleResize( (prop)=>{
        this.setState({
          noOfCarouselImage: prop.noOfCarouselImage
          }
        )
      })
    });       
  }

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
      
      if (carouselRecord.profileImage) {
        profileImg = carouselRecord.profileImage;
      }else if (carouselRecord.thumb) {
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
          <Link className="nav-link" to={`/home/teacher/${carouselRecord.userId}`} title={carouselRecord.name}>
            <div 
              key={index}
              style={{ height: 150, background: "#fff"}}
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
          </Link>
        </div>
      );
    });

    return carouselRows;
  }
  

  render() {
    const { carouselTop10Items } = this.props;
       
    const settingsTop10 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: (carouselTop10Items.length >= 5)? (this.state.noOfCarouselImage): (carouselTop10Items.length),
      slidesToScroll: 1,
      autoplay:true
    };    

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
    }
}

export default TopTutor;

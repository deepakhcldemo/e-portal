import React, { Component } from 'react';
import { handleResize } from '../../shared/library/window_resize';
import Slider from "react-slick";
import GLOBAL_VARIABLES from '../../config/config';

class StudentFeedback extends Component {
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
    const { studentsReview } = this.props;
       
    const settingsStudentsReview = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: (studentsReview.length >= 5)? (this.state.noOfCarouselImage): (studentsReview.length),
        slidesToScroll: 1,
        autoplay:true
    };   

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
    }
}

export default StudentFeedback;

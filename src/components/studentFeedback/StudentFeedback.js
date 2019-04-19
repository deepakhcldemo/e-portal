import React, { Component } from 'react';

import Slider from 'react-slick';
import GLOBAL_VARIABLES from '../../config/config';
import CommentItem from '../../components/commentItem/CommentItem';

class StudentFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfCarouselImage: ''
    };
  }

  studentsReviewChildren = records => {
    const studentsReview = records.map((carouselRecord, index) => {
      return (
        <div key={index} className="vd-wrapper">
          <CommentItem commentDetails={carouselRecord} />
        </div>
      );
    });

    return studentsReview;
  };

  render() {
    const { studentsReview } = this.props;
    let title = '';
    (this.props.headeTitle) ? (title = this.props.headeTitle) : (title = "Feedback")
       
    const settingsStudentsReview = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: studentsReview.length >= 5 ? 5 : studentsReview.length,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <React.Fragment>
        {studentsReview.length > 0 && (
          <div className="col-12 content-container--background">
          <h3 className="mt-30 pad10">{title}{' '} <i className="fas fa-chevron-right"></i></h3>
          <div style={{background: "#FFF",textAlign: "center"}}>
            <Slider {...settingsStudentsReview}>

            {this.studentsReviewChildren(studentsReview)}
            </Slider>
          </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default StudentFeedback;

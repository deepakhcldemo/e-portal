import React, { Component } from 'react';
import { handleResize } from '../../shared/library/window_resize';
import Slider from "react-slick";
import GLOBAL_VARIABLES from '../../config/config';
import CommentItem from '../../components/commentItem/CommentItem';

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

  studentsReviewChildren = (records) =>{
    const studentsReview = records.map((carouselRecord, index) => {
      const moreSymbol = "...";
      const stopSymbol = ".";
      return (
        <div key={index} className="vd-wrapper border_1px padR10">
          <CommentItem  commentDetails={carouselRecord}/>
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

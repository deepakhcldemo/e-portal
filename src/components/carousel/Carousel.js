import React from 'react'
import AliceCarousel from './react-alice-carousel'
import { connect } from 'react-redux';
import "./css/_fade-animation.css";
import "./css/alice-carousel.css";
import "./css/main.css";
import { getCurriculum } from './action';

class Carousel extends React.Component {
  responsive = {
    0: { items: 2 },
    600: { items: 2 },
    960: { items: 3 }
  }

  stagePadding = {
    paddingLeft: 30,
    paddingRight: 30,
  }

  constructor(props) {
    super(props);
  }
  
  carouselModal = (imageType, imageSrc) =>{
    this.props.toggleModal(imageType, imageSrc)
  }
  componentDidMount(){
    this.props.getCurriculum();
  }
  render() {
    const { carouselAwaitingRows } = this.props;
    // console.log(carouselAwaitingRows);  
    return (
      <React.Fragment>
      <div className="app-carousel">

        <AliceCarousel
          duration={1000}
          showSlideInfo={true}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          onSlideChanged={console.debug}
          infinite={true}
          responsive={this.responsive}
          stagePadding={this.stagePadding}
          autoPlay={false}
        > 
        {/* console.log('--- ----', carouselAwaitingRows); */}
          <div className="item">
          <img src="Assets/hdpi/boardBG.jpg" alt="boardBG" className="img-thumbnail" onClick={() => this.carouselModal('image', 'Assets/hdpi/boardBG.jpg')} /></div>
          <div className="item"><img src="Assets/hdpi/Car.png" alt="Car" className="img-thumbnail" onClick={() => this.carouselModal('image','Assets/hdpi/Car.png')} /></div>
          <div className="item" onClick={() => this.carouselModal('video', 'https://www.youtube.com/embed/JKCgwL-IfgM')} >
          <iframe className="img-thumbnail" src="https://www.youtube.com/embed/JKCgwL-IfgM" frameBorder="0"></iframe><h1>3</h1><div className="item-over layer img-thumbnail"></div></div>          
          <div className="item"><h1>4</h1></div>
        </AliceCarousel>        
      </div>

      <div className="app-carousel">
       <AliceCarousel
         duration={1000}
         showSlideInfo={true}
         fadeOutAnimation={true}
         mouseDragEnabled={true}
         onSlideChanged={console.debug}
         infinite={true}
         responsive={this.responsive}
         stagePadding={this.stagePadding}
         autoPlay={false}
       > 
        carouselAwaitingRows.map((curriculumRows, CurriculumRowsIndex) => {          
            // if (curriculumRows.type === 'image') {
            //   <div className="item"><img src={curriculumRows.src} alt="boardBG" className="img-thumbnail" onClick={() => this.carouselModal(curriculumRows.type, curriculumRows.src)} /></div>
            // } else {
            //   <div className="item" onClick={() => this.carouselModal(curriculumRows.type, curriculumRows.src)} ><iframe className="img-thumbnail" src={curriculumRows.src} frameBorder="0"></iframe><h1>3</h1><div className="item-over layer img-thumbnail"></div></div>
            // }
            // console.log('teststst');
            // <div className="item" onClick={() => this.carouselModal(curriculumRows.type, curriculumRows.src)} ><iframe className="img-thumbnail" src={curriculumRows.src} frameBorder="0"></iframe><h1>3</h1><div className="item-over layer img-thumbnail"></div></div>
        });
         <div className="item">
         <img src="Assets/hdpi/boardBG.jpg" alt="boardBG" className="img-thumbnail" onClick={() => this.carouselModal('image', 'Assets/hdpi/boardBG.jpg')} /></div>
         <div className="item"><img src="Assets/hdpi/Car.png" alt="Car" className="img-thumbnail" onClick={() => this.carouselModal('image','Assets/hdpi/Car.png')} /></div>
         <div className="item" onClick={() => this.carouselModal('video', 'https://www.youtube.com/embed/JKCgwL-IfgM')} >
         <iframe className="img-thumbnail" src="https://www.youtube.com/embed/JKCgwL-IfgM" frameBorder="0"></iframe><h1>3</h1><div className="item-over layer img-thumbnail"></div></div>          
         <div className="item"><h1>4</h1></div>
       </AliceCarousel>        
     </div>
     </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
      carouselAwaitingRows: state.carouselStore.carouselData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCurriculum: () => dispatch(getCurriculum()),        
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

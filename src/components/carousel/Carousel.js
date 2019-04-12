import React from 'react'
import AliceCarousel from './react-alice-carousel'
import { connect } from 'react-redux';
import "./css/_fade-animation.css";
import "./css/alice-carousel.css";
import "./css/main.css";
// import { getCurriculum } from './action';


class Carousel extends React.PureComponent {
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

  render() {
    return (
      <div className="app" id="app">
        <AliceCarousel
          duration={1000}
          showSlideInfo={true}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          onSlideChanged={console.debug}
          infinite={true}
          responsive={this.responsive}
          stagePadding={this.stagePadding}
          autoPlay={true}
        > 
          <div className="item">
          <img src="Assets/hdpi/boardBG.jpg" alt="boardBG" className="img-thumbnail" onClick={() => this.carouselModal('image', 'Assets/hdpi/boardBG.jpg')} /></div>
          <div className="item"><img src="Assets/hdpi/Car.png" alt="Car" className="img-thumbnail" onClick={() => this.carouselModal('image','Assets/hdpi/Car.png')} /></div>
          <div className="item" onClick={() => this.carouselModal('video', 'https://www.youtube.com/embed/JKCgwL-IfgM')} >
          <iframe className="img-thumbnail" src="https://www.youtube.com/embed/JKCgwL-IfgM" frameBorder="0"></iframe><h1>3</h1><div className="item-over layer img-thumbnail"></div></div>          
          <div className="item"><h1>4</h1></div>
          <div className="item">EEEEE<h1>5</h1></div>
          <div className="item">FFFFFF<h1>6</h1></div>
          <div className="item">GGGGGGG<h1>7</h1></div>
        </AliceCarousel>        
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//       tree: state.category.tree,
//       modalState: state.curriculum.openModal
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//       getCurriculum: () => dispatch(getCurriculum()),        
//   }
// }

export default Carousel;
// export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

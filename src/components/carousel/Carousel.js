import React from 'react'
import AliceCarousel from './react-alice-carousel'
import Modal from 'react-modal';
import "./css/_fade-animation.css";
import "./css/alice-carousel.css";
import "./css/main.css";


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

  constructor() {
    super();

    this.state = {
        show: true
    };
  }

  render() {
    return (
      <div className="app" id="app">
        <h1 className="h1">Carousel</h1>
        

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
          
          <div className="item">
          <img src="Assets/hdpi/boardBG.jpg" alt="boardBG" width="300px" height="170px" onClick="window.open('anotherpage.html', '_blank');" /><h1>1</h1></div>
          <div className="item"><img src="Assets/hdpi/Car.png" alt="Car" width="300px" height="170px" /><h1>2</h1></div>
          <div className="item"><iframe width="300" height="315" src="https://www.youtube.com/embed/JKCgwL-IfgM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><h1>3</h1></div>
          <div className="item">          
          <h1>4</h1></div>
          <div className="item">EEEEE<h1>5</h1></div>
          <div className="item">FFFFFF<h1>6</h1></div>
          <div className="item">GGGGGGG<h1>7</h1></div>
        </AliceCarousel>
        
      </div>
    )
  }
}

export default Carousel

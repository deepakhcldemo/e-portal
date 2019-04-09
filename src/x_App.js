import React from 'react'
import AliceCarousel from './components/carousel/react-alice-carousel'

class App extends React.PureComponent {
  responsive = {
    0: { items: 2 },
    600: { items: 2 },
    960: { items: 3 }
  }

  stagePadding = {
    paddingLeft: 30,
    paddingRight: 30,
  }

  render() {
    return (
      <div className="app" id="app">
        <h1 className="h1">React Alice Carousel</h1>
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
          <div className="item">ssss<h1>1</h1></div>
          <div className="item">BBBB<h1>2</h1></div>
          <div className="item">CCCC<h1>3</h1></div>
          <div className="item">DDDD<h1>4</h1></div>
          <div className="item">EEEEE<h1>5</h1></div>
        </AliceCarousel>
      </div>
    )
  }
}

export default App

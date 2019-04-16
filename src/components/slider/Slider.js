import React from 'react';
import './Slider.scss';

import ItemsCarousel from 'react-items-carousel';

class Slider extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const carouselRows = this.props.carouselRecords;
    this.setState({
      children: [],
      activeItemIndex: 0,
      carouselRows: carouselRows
    });
  
    setTimeout(() => {
      this.setState({
        children: this.createChildren(20),
      })
    }, 100);
  }

  daysBetween(date1_seconds, date2_seconds) {
    const one_day = 60 * 60 * 24;
    var difference_ms = Math.abs(date1_seconds - date2_seconds);
    return Math.round(difference_ms/one_day);
  }
              
  // componentDidUpdate(){
  //   const carouselRows = this.props.carouselRecords;
  //   this.setState({
  //     carouselRows: carouselRows
  //   });
  // }
  
  // createChildren = n => ['aa','bb','cc', 'ddd', 'ee','ff','gg','hh'].map(i => {
  //   let imgPath = "https://i.pinimg.com/originals/66/24/96/6624960f0062bd8b8845037c6776277c.jpg";
  //   return (
  //     <div key={i} style={{ height: 150, background: '#000' }} className="vd-wrapper">
  //       <img src={imgPath}/>
  //     </div>
  //   )
  // });

  createChildren = n => this.props.carouselRecords.map((carouselRecord, index) => {
    const moreSymbol = '...';
    const today = Date.now()/1000; // convert into second
    var noOfDays = this.daysBetween(carouselRecord.created_date.seconds, today);

    return (
      <div key={index} className="vd-wrapper">
        <a href="#" title={carouselRecord.title}>
          <div key={index} style={{ height: 150, background: '#000' }} className="vd-wrapper">
            <iframe key={index} className="d-block w-100" src={carouselRecord.src} frameBorder="0"></iframe><div key="layer{index}" className="item-over layer"></div>
          </div>   
          
          <div className="vd-content">
            <h5>{
              (carouselRecord.title.length > 50 ) ? carouselRecord.title.substring(0, 50)+(moreSymbol): (carouselRecord.title)} <i className="fas fa-ellipsis-v"></i></h5>
            <p>Speaker. {carouselRecord.views} views. {noOfDays} days ago</p>
          </div>
        </a>
      </div>
    )
  });

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
  
  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;
    return (
      <div>
        {this.props.children}
        <ItemsCarousel
        // Placeholder configurations
        // enablePlaceholder
        // numberOfPlaceholderItems={5}
        // minimumPlaceholderTime={1000}
        // placeholderItem={<div style={{ height: 150, background: '#900' }}>Placeholder</div>}

        // Carousel configurations
        numberOfCards={5}
        gutter={5}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={false}

        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={activeItemIndex}
        activePosition={'center'}

        chevronWidth={24}
        rightChevron={'>'}
        leftChevron={'<'}
        outsideChevron={false}
      >
        {children}
      </ItemsCarousel>
      </div>
    );  
  }
}
export default Slider;

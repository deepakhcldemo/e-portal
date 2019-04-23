import React, { Component } from 'react';
// Date format Plugin
import moment from 'moment';
// Slider Component Plugin
import Slider from 'react-slick';
// Video Item Component
import VideoItem from '../../components/videoItem/VideoItem';
import GLOBAL_VARIABLES from '../../config/config';

class RecentVideo extends Component {
  tryRequire = path => {
    try {
      return require(`${path}`);
    } catch (err) {
      return null;
    }
  };

  createChildren = records => {
    return records.map((carouselRecord, index) => {
      carouselRecord.date = (carouselRecord.created) ? moment(carouselRecord.created.toDate()).fromNow() : ''
      carouselRecord.thumb = this.tryRequire(carouselRecord.thumb)
        ? carouselRecord.thumb
        : GLOBAL_VARIABLES.VIDEO_PLACEHOLDER;

      return (
        <div key={index} className="vd-wrapper col-xs-12 padR10">
          <VideoItem
            isNotVisibleVideoMeta={this.props.isNotVisibleVideoMeta}
            videoDetails={carouselRecord}
          />
        </div>
      );
    });
  };

  render() {
    const { headeTitle, carousellistNewlyItems } = this.props;
    const title = headeTitle ? headeTitle : 'Recent Videos';
    const style = { background: '#FFF', textAlign: 'center' };
    const settingsNewlyItems = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow:
        carousellistNewlyItems.length >= 5 ? 5 : carousellistNewlyItems.length,
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
      <>
        {carousellistNewlyItems.length > 0 && (
          <div className="col-12 content-container--background">
            <h3 className="mt-30">
              {title} <i className="fas fa-chevron-right" />
            </h3>
            <div style={style}>
              <Slider {...settingsNewlyItems}>
                {this.createChildren(carousellistNewlyItems)}
              </Slider>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default RecentVideo;

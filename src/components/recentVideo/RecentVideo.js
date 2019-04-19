import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import VideoItem from '../../components/videoItem/VideoItem';

class RecentVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfCarouselImage: ''
    };
  }

  daysBetween(date1_seconds, date2_seconds) {
    if (date1_seconds && date2_seconds) {
      const one_day = 60 * 60 * 24;
      var difference_ms = Math.abs(date1_seconds - date2_seconds);
      return Math.round(difference_ms / one_day);
    } else {
      return '';
    }
  }

  createChildren = records => {
    const carouselRows = records.map((carouselRecord, index) => {
      const moreSymbol = '...';
      const today = Date.now() / 1000; // convert into second
      var noOfDays = this.daysBetween(
        carouselRecord.createdOn ? carouselRecord.createdOn : today,
        today
      );

      let title = '';
      let profileImg = '';
      let rating = '';

      if (carouselRecord.firstName) {
        title = carouselRecord.firstName;

        if (carouselRecord.lastName) {
          title += ' ' + carouselRecord.lastName;
        }
      } else if (carouselRecord.title) {
        title = carouselRecord.title;
      }

      if (carouselRecord.profileImage) {
        profileImg = carouselRecord.profileImage;
      } else if (carouselRecord.thumb) {
        profileImg = carouselRecord.thumb;
      } else {
        if (carouselRecord.gender === 'Female') {
          profileImg =
            'https://i0.wp.com/www.antgibbz.com/wp-content/uploads/2016/05/person-placeholder-200x200.jpg?ssl=1';
        }
        if (carouselRecord.gender === 'Male') {
          profileImg =
            'https://tricityescaperooms.com/wp-content/uploads/2018/01/person-placeholder-male-5.jpg';
        }
      }

      if (carouselRecord.rating) {
        rating = carouselRecord.rating;
      }

      if (carouselRecord.views) {
        rating = carouselRecord.views;
      }
      carouselRecord.videoSrc =
        'https://firebasestorage.googleapis.com/v0/b/e-project-4e023.appspot.com/o/M6mNAMnGQNS7WvQcAOlC84A7Hd52%2FFalls9.mov?alt=media&token=215d9b17-ac0c-456a-a8dc-afbdcafb9167';

      carouselRecord.noOfDays = noOfDays;
      carouselRecord.noOfRatings = 10000;
      carouselRecord.rating = 3;
      return (
        <div key={index} className="vd-wrapper  col-xs-12 padR10">
          <Link
            className="nav-link"
            style={{ padding: '0px' }}
            to={`/home/teacher/${carouselRecord.userId}`}
            title={carouselRecord.name}
          >
            <VideoItem videoDetails={carouselRecord} />
          </Link>
        </div>
      );
    });

    return carouselRows;
  };

  render() {
    let title = '';
    const { carousellistNewlyItems } = this.props;
    (this.props.headeTitle) ? (title = this.props.headeTitle) : (title = "Recent Videos")
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
      <React.Fragment>
        {carousellistNewlyItems.length > 0 && (
          <div className="col-12 content-container--background">
            <h3 className="mt-30">
              {title}{' '}
              <i className="fas fa-chevron-right" />
            </h3>
            <div style={{ background: '#FFF', textAlign: 'center' }}>
              <Slider {...settingsNewlyItems}>
                {this.createChildren(carousellistNewlyItems)}
              </Slider>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default RecentVideo;

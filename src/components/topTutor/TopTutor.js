import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import GLOBAL_VARIABLES from '../../config/config';
import TeacherItem from '../../components/teacherItem/TeacherItem';

class TopTutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfCarouselImage: ''
    };
  }

  daysBetween(date1_seconds, date2_seconds) {
    if (date1_seconds && date2_seconds) {
      const one_day = 60 * 60 * 24 * 1000;
      var difference_ms = Math.abs(date1_seconds - date2_seconds);
      return Math.round(difference_ms / one_day);
    } else {
      return '';
    }
  }

  createChildren = records => {
    const carouselRows = records.map((carouselRecord, index) => {
      const today = Date.now(); // convert into second
      var noOfDays = this.daysBetween(
        carouselRecord.createdAt ? carouselRecord.createdAt : today,
        today
      );
      carouselRecord.noOfDays = noOfDays;
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

      return (
        <div key={index} className="vd-wrapper  col-xs-12">
          <Link
            className="nav-link"
            style={{ padding: '0px' }}
            to={`/home/teacher/${carouselRecord.userId}`}
            title={carouselRecord.name}
          >
            <TeacherItem userProfile={carouselRecord} />
          </Link>
        </div>
      );
    });

    return carouselRows;
  };

  render() {
    const { carouselTop10Items } = this.props;
    let title = '';
    this.props.headeTitle
      ? (title = this.props.headeTitle)
      : (title = 'Top Tutor');

    const settingsTop10 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow:
        carouselTop10Items.length >= 5 ? 5 : carouselTop10Items.length,
      slidesToScroll: 1,
      autoplay: false,
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
        {carouselTop10Items.length > 0 && (
          <div className="col-12 content-container--background">
            <h3 className="mt-30">
              {' '}
              {title} <i className="fas fa-chevron-right" />
            </h3>
            <div style={{ background: '#FFF', textAlign: 'center' }}>
              <Slider {...settingsTop10}>
                {this.createChildren(carouselTop10Items)}
              </Slider>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default TopTutor;

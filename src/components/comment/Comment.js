import React, { Component } from 'react';
import GLOBAL_VARIABLES from '../../config/config';
import Slider from 'react-slick';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfCarouselImage: ''
    };
  }

  render() {
    const { commentRows, pageName } = this.props;
    const settingsComment = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };

    let listAwaitingItems = '';
    if (commentRows && commentRows.length > 0) {
      listAwaitingItems = commentRows.map((commentRow, index) => (
        <div key={index}>
          {commentRow.comment_image && (
            <React.Fragment>
              <img
                alt=""
                src={
                  GLOBAL_VARIABLES.BANNER_PATH +
                  pageName +
                  '/' +
                  commentRow.comment_image
                }
                className="d-block comment"
              />
            </React.Fragment>
          )}
        </div>
      ));
    }
    return (
      <React.Fragment>
        {listAwaitingItems.length > 0 && (
          <div className="col-12 content-container--background col-without--padding">
            <div className="comment-container" style={{ textAlign: 'center' }}>
              <Slider {...settingsComment}>{listAwaitingItems}</Slider>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Comment;

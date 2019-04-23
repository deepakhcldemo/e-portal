import React, { Component } from "react";
import GLOBAL_VARIABLES from "../../config/config";
import Slider from "react-slick";

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfCarouselImage: ""
    };
  }

  render() {
    const { bannerRows, pageName } = this.props;
    const settingsBanner = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };

    let listAwaitingItems = "";
    if (bannerRows && bannerRows.length > 0) {
      listAwaitingItems = bannerRows.map((bannerRow, index) => (
        <div key={index}>
          {bannerRow.banner_image && (
            <img
              src={
                GLOBAL_VARIABLES.HOME_BANNER_PATH +
                pageName +
                "/" +
                bannerRow.banner_image
              }
              className="d-block w-100"
            />
          )}
        </div>
      ));
    }
    return (
      <React.Fragment>
        {listAwaitingItems.length > 0 && (
          <div className="col-12 content-container--background">
            <div style={{ background: "#FFF", textAlign: "center" }}>
              <Slider {...settingsBanner}>{listAwaitingItems}</Slider>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Banner;

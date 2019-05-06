import React, { Component } from "react";
import Slider from "react-slick";
import './HorSlider.scss';


export default class HorSlider extends Component {
    render() {
      const settings = {
        dots: false,
        infinite: false,
        slidesToScroll: 1
      };
      return (
        <div>
          <h2> Single Item</h2>
          <Slider {...settings} className="slider-main">
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
            <div>
              <h3>7</h3>
            </div>
            <div>
              <h3>8</h3>
            </div>
            <div>
              <h3>9</h3>
            </div>
            <div>
              <h3>10</h3>
            </div>
            <div>
              <h3>11</h3>
            </div>
            <div>
              <h3>12</h3>
            </div>
            <div>
              <h3>13</h3>
            </div>
          </Slider>
        </div>
      );
    }
  }
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SimpleSlider.scss";

import AsanaCard from "./AsanaCard";

import { v4 as uuidv4 } from 'uuid';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

export default function SimpleSlider({list}) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 515,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {list && list.map( el => <AsanaCard link={el} type={'DELETE'} key={uuidv4()}/>)}
      </Slider>
    </div>
  );
}
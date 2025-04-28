import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hero2.css";

const events = [
  { title: "Sunday Service", date: "Every Sunday, 9 AM" },
  { title: "Bible Study", date: "Wednesdays, 6 PM" },
  { title: "Youth Fellowship", date: "Fridays, 7 PM" },
  { title: "Community Outreach", date: "Monthly, 1st Saturday" },
];

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {events.map((event, index) => (
        <div key={index} className="slide">
          <h2>{event.title}</h2>
          <p>{event.date}</p>
        </div>
      ))}
    </Slider>
  );
};

export default HeroCarousel;
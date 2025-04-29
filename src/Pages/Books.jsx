import React from "react";
import Slider from "react-slick";
import "./Books.css"; 
import Bookscatalog from "../Components/Bookscatalog/Bookscatalog";

const books = [
  {
    id: 1,
    title: "Book Title 1",
    author: "Author Name",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Book Title 2",
    author: "Author Name",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Book Title 3",
    author: "Author Name",
    image: "https://via.placeholder.com/150",
  },
];

const BookCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className="book-slide">
            <img src={book.image} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </Slider>
      <Bookscatalog />
    </div>
  );
};

export default BookCarousel;
import React from "react";
import Slider from "react-slick";
import "./Books.css";
import Bookscatalog from "../Components/Bookscatalog/Bookscatalog";
import { FaBook, FaShoppingCart, FaDownload } from "react-icons/fa";

const featuredBooks = [
  {
    id: 1,
    title: "Faith Unleashed",
    author: "Emmanuel Asare",
    description: "Discover the power of unwavering faith in your spiritual journey.",
    image: "https://via.placeholder.com/300x400/212EA0/FFFFFF?text=Faith+Unleashed",
    price: "$15.99",
  },
  {
    id: 2,
    title: "Prayer Warriors",
    author: "Emmanuel Asare",
    description: "Learn effective prayer strategies to overcome life's challenges.",
    image: "https://via.placeholder.com/300x400/FFD700/000000?text=Prayer+Warriors",
    price: "$12.99",
  },
  {
    id: 3,
    title: "Divine Purpose",
    author: "Emmanuel Asare",
    description: "Uncover God's unique purpose for your life and ministry.",
    image: "https://via.placeholder.com/300x400/212EA0/FFFFFF?text=Divine+Purpose",
    price: "$14.99",
  },
  {
    id: 4,
    title: "Spiritual Growth",
    author: "Emmanuel Asare",
    description: "A guide to deepening your relationship with God.",
    image: "https://via.placeholder.com/300x400/FFD700/000000?text=Spiritual+Growth",
    price: "$13.99",
  },
];

const BooksPage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="books-page">
      <div className="books-hero">
        <div className="books-hero-content">
          <h1>Books & Publications</h1>
          <p>Transformative resources to strengthen your faith and spiritual growth</p>
        </div>
      </div>

      <div className="books-content">
        <section className="featured-books-section">
          <div className="section-header">
            <h2>Featured Books</h2>
            <div className="title-underline"></div>
          </div>

          <div className="featured-books-slider">
            <Slider {...sliderSettings}>
              {featuredBooks.map((book) => (
                <div key={book.id} className="book-slide">
                  <div className="book-card">
                    <div className="book-image-container">
                      <img src={book.image} alt={book.title} className="book-image" />
                    </div>
                    <div className="book-details">
                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-author">by {book.author}</p>
                      <p className="book-description">{book.description}</p>
                      <p className="book-price">{book.price}</p>
                      <div className="book-actions">
                        <button className="book-action-btn preview-btn">
                          <FaBook /> Preview
                        </button>
                        <button className="book-action-btn purchase-btn">
                          <FaShoppingCart /> Purchase
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        <section className="all-books-section">
          <div className="section-header">
            <h2>Complete Catalog</h2>
            <div className="title-underline"></div>
          </div>
          <Bookscatalog />
        </section>

        <section className="free-resources-section">
          <div className="section-header">
            <h2>Free Resources</h2>
            <div className="title-underline"></div>
          </div>
          <div className="free-resources-container">
            <div className="free-resource-card">
              <div className="resource-icon"><FaDownload /></div>
              <h3>Prayer Guide</h3>
              <p>A comprehensive guide to effective prayer</p>
              <button className="download-btn">Download PDF</button>
            </div>
            <div className="free-resource-card">
              <div className="resource-icon"><FaDownload /></div>
              <h3>Bible Study Notes</h3>
              <p>In-depth study notes on key biblical passages</p>
              <button className="download-btn">Download PDF</button>
            </div>
            <div className="free-resource-card">
              <div className="resource-icon"><FaDownload /></div>
              <h3>Devotional Guide</h3>
              <p>30-day devotional for spiritual growth</p>
              <button className="download-btn">Download PDF</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BooksPage;
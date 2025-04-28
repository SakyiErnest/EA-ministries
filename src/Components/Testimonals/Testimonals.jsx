import React, { useState, useEffect } from 'react';
import './Testimonals.css';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Olivia Johnson",
    location: "Accra, Ghana",
    message: "The ministry has been a blessing to my family. The teachings have transformed our lives and brought us closer to God. I'm grateful for the spiritual guidance and support.",
    rating: 5
  },
  {
    id: 2,
    name: "John Mensah",
    location: "Kumasi, Ghana",
    message: "I've been attending Emmanuel Asare Ministries for over two years now, and the impact on my spiritual growth has been tremendous. The community is welcoming and supportive.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Agyemang",
    location: "Takoradi, Ghana",
    message: "The scholarship program helped me complete my education when I had no hope. Now I have a degree and a good job. God bless this ministry for their generosity and vision.",
    rating: 5
  },
  {
    id: 4,
    name: "Sophia Owusu",
    location: "Cape Coast, Ghana",
    message: "The books and resources provided by the ministry have deepened my understanding of the Bible. I appreciate the clear teaching and practical application of God's Word.",
    rating: 5
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);

  // Handle next testimonial
  const nextTestimonial = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(newIndex);
  };

  // Handle previous testimonial
  const prevTestimonial = () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);
  };

  // Update active testimonial when currentIndex changes
  useEffect(() => {
    setActiveTestimonial(testimonials[currentIndex]);
  }, [currentIndex]);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">What People Say</h2>
      <div className="title-underline"></div>

      <div className="testimonials-container">
        <button className="testimonial-nav prev-btn" onClick={prevTestimonial}>
          <FaChevronLeft />
        </button>

        <div className="testimonial-card">
          <div className="quote-icon">
            <FaQuoteLeft />
          </div>

          <blockquote className="testimonial-text">{activeTestimonial.message}</blockquote>

          <div className="testimonial-rating">
            {[...Array(activeTestimonial.rating)].map((_, i) => (
              <FaStar key={i} className="star-icon" />
            ))}
          </div>

          <div className="testimonial-user">
            <div className="user-info">
              <h3 className="user-name">{activeTestimonial.name}</h3>
              <p className="user-location">{activeTestimonial.location}</p>
            </div>
          </div>
        </div>

        <button className="testimonial-nav next-btn" onClick={nextTestimonial}>
          <FaChevronRight />
        </button>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
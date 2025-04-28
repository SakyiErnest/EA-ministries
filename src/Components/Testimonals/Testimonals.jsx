import React from 'react';
import './Testimonals.css';

const testimonials = [
  {
    name: "John Doe",
    message: "This church has truly changed my life. I'm so grateful for the community here."
  },
  {
    name: "Jane Smith",
    message: "The warmth and love I've experienced here are indescribable."
  }
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What People Say</h2>
      <div className="testimonial-list">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <blockquote>{testimonial.message}</blockquote>
            <p>- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
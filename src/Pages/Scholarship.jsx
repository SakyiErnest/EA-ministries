import React from "react";
import "./Scholarship.css";
import { FaGraduationCap, FaFileAlt, FaCalendarAlt, FaUsers, FaCheckCircle } from "react-icons/fa";

const Scholarship = () => {
  const scholarshipTypes = [
    {
      title: "Academic Excellence",
      description: "For students with outstanding academic achievements and leadership potential.",
      amount: "$5,000",
      deadline: "June 15, 2023",
    },
    {
      title: "Ministry Leadership",
      description: "Supporting students pursuing education in ministry and church leadership.",
      amount: "$3,500",
      deadline: "July 1, 2023",
    },
    {
      title: "Community Service",
      description: "For students demonstrating exceptional commitment to community service.",
      amount: "$2,500",
      deadline: "June 30, 2023",
    }
  ];

  const applicationSteps = [
    {
      icon: <FaCheckCircle />,
      title: "Check Eligibility",
      description: "Ensure you meet the academic and financial criteria for the scholarship program."
    },
    {
      icon: <FaFileAlt />,
      title: "Prepare Documents",
      description: "Gather your transcript, recommendation letters, and write a personal essay."
    },
    {
      icon: <FaUsers />,
      title: "Complete Application",
      description: "Fill out the online application form with accurate details about yourself."
    },
    {
      icon: <FaCalendarAlt />,
      title: "Submit on Time",
      description: "Ensure all required materials are submitted before the application deadline."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      program: "Theology",
      quote: "This scholarship changed my life. I was able to pursue my calling in ministry without the burden of financial stress.",
      year: "2022 Recipient"
    },
    {
      name: "Michael Thompson",
      program: "Biblical Studies",
      quote: "I'm grateful for the opportunity to focus on my studies and community service thanks to this generous scholarship.",
      year: "2021 Recipient"
    }
  ];

  return (
    <div className="scholarship-page">
      <div className="scholarship-hero">
        <div className="scholarship-hero-content">
          <h1>Scholarship Program</h1>
          <p>Empowering the next generation through education and spiritual growth</p>
        </div>
      </div>

      <div className="scholarship-content">
        <section className="scholarship-intro">
          <div className="section-header">
            <h2>About Our Scholarship Program</h2>
            <div className="title-underline"></div>
          </div>
          <p className="intro-text">
            Our scholarship program is designed to support students who demonstrate academic excellence,
            leadership potential, and financial need. We believe that education is a powerful tool for
            change, and our goal is to make it accessible to deserving individuals who are passionate
            about making a positive impact in their communities and beyond.
          </p>
          <div className="scholarship-icon">
            <FaGraduationCap />
          </div>
        </section>

        <section className="scholarship-types-section">
          <div className="section-header">
            <h2>Available Scholarships</h2>
            <div className="title-underline"></div>
          </div>
          <div className="scholarship-types">
            {scholarshipTypes.map((scholarship, index) => (
              <div key={index} className="scholarship-type-card">
                <h3>{scholarship.title}</h3>
                <p>{scholarship.description}</p>
                <div className="scholarship-details-row">
                  <div className="scholarship-detail">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value">{scholarship.amount}</span>
                  </div>
                  <div className="scholarship-detail">
                    <span className="detail-label">Deadline:</span>
                    <span className="detail-value">{scholarship.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="application-process">
          <div className="section-header">
            <h2>Application Process</h2>
            <div className="title-underline"></div>
          </div>
          <div className="application-steps">
            {applicationSteps.map((step, index) => (
              <div key={index} className="application-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <div className="apply-button-container">
            <button className="apply-btn">Apply Now</button>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-header">
            <h2>Scholarship Recipients</h2>
            <div className="title-underline"></div>
          </div>
          <div className="testimonials">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="quote-mark">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.program} | {testimonial.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <div className="title-underline"></div>
          </div>
          <div className="faq-container">
            <div className="faq-item">
              <h3>Who is eligible to apply?</h3>
              <p>Students who demonstrate academic excellence, leadership potential, and financial need. Specific eligibility criteria vary by scholarship type.</p>
            </div>
            <div className="faq-item">
              <h3>When is the application deadline?</h3>
              <p>Application deadlines vary by scholarship type. Please refer to the specific scholarship information for exact dates.</p>
            </div>
            <div className="faq-item">
              <h3>How are recipients selected?</h3>
              <p>Recipients are selected based on academic achievement, leadership qualities, financial need, and alignment with our ministry's values and mission.</p>
            </div>
            <div className="faq-item">
              <h3>Can I apply for multiple scholarships?</h3>
              <p>Yes, you may apply for multiple scholarships if you meet the eligibility criteria for each one.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Scholarship;
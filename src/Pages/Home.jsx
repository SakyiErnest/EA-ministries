import React from 'react'
import Hero from '../Components/Hero/Hero'
import Programs from '../Components/Programs/Programs'
import Title from '../Components/Title/Title'
import Testimonials from '../Components/Testimonials/Testimonials'
import Gallery from '../Components/Gallery/Gallery'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Hero />
      </section>

      {/* Programs Section */}
      <section className="programs-section">
        <div className="section-container">
          <Title />
          <Programs />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <Testimonials />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="section-container">
          <Gallery />
        </div>
      </section>
    </div>
  )
}

export default Home
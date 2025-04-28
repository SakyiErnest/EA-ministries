import React from 'react'
import Hero from '../Components/Hero/Hero'
import Programs from '../Components/Programs/Programs'
import Title from '../Components/Title/Title'
import Testimonals from '../Components/Testimonals/Testimonals'
import Gallery from '../Components/Gallery/Gallery'
const Home = () => {
  return (
    <div>
      <Hero />
      <Title />
      <Programs />
      <Testimonals />
      <Gallery />
    </div>
  )
}

export default Home
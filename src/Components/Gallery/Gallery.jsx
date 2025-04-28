import React from 'react'
import './Gallery.css'
import image1 from '../../assets/image1.jpg'
import image3 from '../../assets/image3.jpg'
const Gallery = () => {
  return (
    <div className='church'>
      <h1>Gallery</h1>
      <div className="gallery">
        <img src={image1} alt=''/>
        <img src={image3} alt=''/>
      </div>
    </div>
  )
}

export default Gallery
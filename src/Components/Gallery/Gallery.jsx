import React, { useState } from 'react'
import './Gallery.css'
import image1 from '../../assets/image1.jpg'
import image3 from '../../assets/image3.jpg'
import image5 from '../../assets/image5.jpg'
import image6 from '../../assets/image6.jpg'
import image8 from '../../assets/image8.jpg'
import image9 from '../../assets/image9.jpg'
import { FaSearch, FaTimes } from 'react-icons/fa'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { id: 1, src: image1, alt: "Church service", category: "worship" },
    { id: 2, src: image3, alt: "Community outreach", category: "outreach" },
    { id: 3, src: image5, alt: "Partnership meeting", category: "partnership" },
    { id: 4, src: image6, alt: "Church building", category: "facilities" },
    { id: 5, src: image8, alt: "Scholarship program", category: "education" },
    { id: 6, src: image9, alt: "Book distribution", category: "resources" }
  ];

  // Open image in lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <div className='gallery-section'>
      <h2 className="gallery-title">Our Gallery</h2>
      <div className="title-underline"></div>
      <p className="gallery-description">
        Explore moments from our services, events, and community outreach programs.
      </p>

      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <div className="gallery-item" key={image.id}>
            <img
              src={image.src}
              alt={image.alt}
              className="gallery-image"
              loading="lazy"
            />
            <div className="gallery-overlay" onClick={() => openLightbox(image)}>
              <div className="overlay-content">
                <div className="search-icon">
                  <FaSearch />
                </div>
                <p className="image-category">{image.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="close-lightbox" onClick={closeLightbox}>
            <FaTimes />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="lightbox-image"
            />
            <div className="lightbox-caption">
              <p>{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
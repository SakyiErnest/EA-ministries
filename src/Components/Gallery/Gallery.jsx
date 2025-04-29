import React, { useState, useEffect } from 'react'
import './Gallery.css'
import image1 from '../../assets/image1.jpg'
import image3 from '../../assets/image3.jpg'
import image5 from '../../assets/image5.jpg'
import image6 from '../../assets/image6.jpg'
import image8 from '../../assets/image8.jpg'
import image9 from '../../assets/image9.jpg'
import { FaSearch, FaTimes } from 'react-icons/fa'
import OptimizedImage from '../UI/OptimizedImage'
import { preloadImages } from '../../utils/imageOptimizer'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const galleryImages = [
    { id: 1, src: image1, alt: "Church service", category: "worship" },
    { id: 2, src: image3, alt: "Community outreach", category: "outreach" },
    { id: 3, src: image5, alt: "Partnership meeting", category: "partnership" },
    { id: 4, src: image6, alt: "Church building", category: "facilities" },
    { id: 5, src: image8, alt: "Scholarship program", category: "education" },
    { id: 6, src: image9, alt: "Book distribution", category: "resources" }
  ];

  // Preload first two images for faster initial display
  useEffect(() => {
    const imagesToPreload = galleryImages.slice(0, 2).map(img => img.src);
    preloadImages(imagesToPreload);
  }, []);

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

  // Track image loading progress
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  return (
    <div className='gallery-section'>
      <h2 className="gallery-title">Our Gallery</h2>
      <div className="title-underline"></div>
      <p className="gallery-description">
        Explore moments from our services, events, and community outreach programs.
      </p>

      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div
            className="gallery-item"
            key={image.id}
            data-aspect-ratio="4:3"
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="gallery-image"
              objectFit="cover"
              priority={index < 2} // Prioritize loading first two images
              onLoad={handleImageLoad}
              width={index < 2 ? 600 : 400} // Higher quality for first two images
              height={index < 2 ? 450 : 300}
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

      {/* Loading indicator */}
      {imagesLoaded < galleryImages.length && (
        <div className="gallery-loading-indicator">
          <p>Loading images... {Math.round((imagesLoaded / galleryImages.length) * 100)}%</p>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="close-lightbox" onClick={closeLightbox}>
            <FaTimes />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <OptimizedImage
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="lightbox-image"
              priority={true}
              width={1200}
              blur={false}
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
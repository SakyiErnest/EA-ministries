import React, { useState, useEffect, useRef } from 'react';
import { getResponsiveImageUrl, getImageSizeForViewport, isInViewport, createPlaceholder } from '../../utils/imageOptimizer';
import './OptimizedImage.css';

/**
 * Optimized image component with lazy loading, responsive sizing, and placeholders
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  style = {},
  objectFit = 'cover',
  priority = false,
  onLoad,
  onClick,
  blur = true,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [placeholder, setPlaceholder] = useState(null);
  const [inView, setInView] = useState(priority);
  const [error, setError] = useState(false);
  const imageRef = useRef(null);
  const observerRef = useRef(null);
  
  // Generate responsive image URL
  const responsiveWidth = width || getImageSizeForViewport();
  const optimizedSrc = getResponsiveImageUrl(src, responsiveWidth);
  
  // Create placeholder effect
  useEffect(() => {
    if (blur && src && !placeholder && !loaded) {
      createPlaceholder(src, (dataUrl) => {
        if (dataUrl) {
          setPlaceholder(dataUrl);
        }
      });
    }
  }, [src, blur, placeholder, loaded]);
  
  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!priority && imageRef.current && !loaded) {
      // Check if already in viewport
      if (isInViewport(imageRef.current)) {
        setInView(true);
        return;
      }
      
      // Set up intersection observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setInView(true);
            observerRef.current.disconnect();
          }
        },
        { rootMargin: '200px' }
      );
      
      observerRef.current.observe(imageRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority, loaded]);
  
  // Handle image load
  const handleLoad = (e) => {
    setLoaded(true);
    if (onLoad) onLoad(e);
  };
  
  // Handle image error
  const handleError = () => {
    setError(true);
    setLoaded(true);
  };
  
  // Combine styles
  const combinedStyle = {
    ...style,
    objectFit,
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };
  
  // Placeholder style
  const placeholderStyle = {
    backgroundImage: placeholder ? `url(${placeholder})` : 'none',
    filter: 'blur(10px)',
    opacity: loaded ? 0 : 1,
  };
  
  return (
    <div 
      className={`optimized-image-container ${className}`} 
      ref={imageRef}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
      onClick={onClick}
    >
      {placeholder && <div className="image-placeholder" style={placeholderStyle} />}
      
      {(inView || priority) && !error && (
        <img
          src={optimizedSrc}
          alt={alt}
          className="optimized-image"
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          style={combinedStyle}
          {...props}
        />
      )}
      
      {error && (
        <div className="image-error">
          <span>Image not available</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

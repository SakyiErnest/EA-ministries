/**
 * Image optimization utilities for improving website performance
 */

/**
 * Generate a responsive image URL with width parameter
 * @param {string} url - Original image URL
 * @param {number} width - Desired width in pixels
 * @returns {string} - Optimized image URL
 */
export const getResponsiveImageUrl = (url, width) => {
  // Handle Firebase Storage URLs
  if (url && url.includes('firebasestorage.googleapis.com')) {
    // Add width parameter to Firebase Storage URL
    // Format: https://firebasestorage.googleapis.com/v0/b/[bucket]/o/[path]?alt=media&token=[token]
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${width}`;
  }
  
  // Handle Unsplash URLs
  if (url && url.includes('unsplash.com')) {
    // Unsplash allows direct width specification
    // Format: https://images.unsplash.com/photo-[id]?w=[width]&q=[quality]
    if (url.includes('?')) {
      // URL already has parameters
      return url.includes('w=') 
        ? url.replace(/w=\d+/, `w=${width}`) 
        : `${url}&w=${width}&q=80`;
    } else {
      return `${url}?w=${width}&q=80`;
    }
  }
  
  // For local images or other sources, return the original URL
  return url;
};

/**
 * Get appropriate image size based on viewport width
 * @returns {number} - Appropriate image width
 */
export const getImageSizeForViewport = () => {
  const width = window.innerWidth;
  
  if (width <= 480) return 480;
  if (width <= 768) return 768;
  if (width <= 1024) return 1024;
  if (width <= 1440) return 1440;
  return 1920;
};

/**
 * Create a blurred placeholder for an image
 * @param {string} src - Image source URL
 * @param {Function} callback - Callback function with data URL
 */
export const createPlaceholder = (src, callback) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  
  img.onload = () => {
    // Create a small canvas for the placeholder
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set small dimensions for the placeholder
    canvas.width = 20;
    canvas.height = 20 * (img.height / img.width);
    
    // Draw the image at a small size
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Get the data URL
    try {
      const dataURL = canvas.toDataURL('image/jpeg', 0.5);
      callback(dataURL);
    } catch (e) {
      console.error('Error creating placeholder:', e);
      callback(null);
    }
  };
  
  img.onerror = () => {
    console.error('Error loading image for placeholder');
    callback(null);
  };
  
  img.src = src;
};

/**
 * Preload critical images
 * @param {Array} urls - Array of image URLs to preload
 */
export const preloadImages = (urls) => {
  if (!urls || !Array.isArray(urls)) return;
  
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

/**
 * Check if an image is in the viewport
 * @param {HTMLElement} element - DOM element to check
 * @param {number} offset - Offset to load before visible
 * @returns {boolean} - Whether element is in viewport
 */
export const isInViewport = (element, offset = 200) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight + offset) &&
    rect.bottom >= -offset &&
    rect.left <= (window.innerWidth + offset) &&
    rect.right >= -offset
  );
};

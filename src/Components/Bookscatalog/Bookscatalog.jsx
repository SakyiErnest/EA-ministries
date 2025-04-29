import React from 'react'
import './bookscatalog.css'
const Bookscatalog = () => {
  return (
    <div>
      <h1>Book Catalog</h1>
      <p>Explore our collection of spiritual books and resources designed to help you grow in your faith journey.</p>
      <div className="book-catalog">
        {/* Book items will be rendered here */}
        <div className="book-item">
          <img src="https://via.placeholder.com/150" alt="Book Title" />
          <h3>Book Title 1</h3>
          <p>Author Name</p>
        </div>
        <div className="book-item">
          <img src="https://via.placeholder.com/150" alt="Book Title" />
          <h3>Book Title 2</h3>
          <p>Author Name</p>
        </div>
        <div className="book-item">
          <img src="https://via.placeholder.com/150" alt="Book Title" />
          <h3>Book Title 3</h3>
          <p>Author Name</p>
        </div>
      </div>
    </div>
  )
}

export default Bookscatalog
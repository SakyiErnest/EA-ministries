import React from 'react'
import './program.css'
import image_5 from '../../assets/image5.jpg'
import image_8 from '../../assets/image8.jpg'
import image_9 from '../../assets/image9.jpg'
import handshake from '../../assets/handshake.png'
import scholarship from '../../assets/scholarship.png'
import book from '../../assets/book.png'

const Programs = () => {
  return (
    <div className='programs'>
      <div className="program">
        <img src={image_5} alt='' className=''/>
        <div className="caption">
          <img src={handshake} alt='' className=''/>
          <p>Partnership</p>
        </div>
      </div>
      <div className="program">
        <img src={image_8} alt='' className=''/>
        <div className="caption">
          <img src={scholarship} alt='' className=''/>
          <p>Scholarship</p>
        </div>
      </div>
      <div className="program">
        <img src={image_9} alt='' className=''/>
        <div className="caption">
          <img src={book} alt='' className=''/>
          <p>Books</p>
        </div>
      </div>
    </div>
  )
}

export default Programs
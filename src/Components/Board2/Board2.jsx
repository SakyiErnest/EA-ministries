import React from 'react'
import './Board2.css'
import photo1 from '../../assets/WhatsApp Image 2024-10-18 at 11.14.47_a80ec106.jpg'
import photo2 from '../../assets/IMG-20240705-WA0001.jpg'
const Board2 = () => {
  return (
    <div className='board2'>
      <div className="member">
        <img src={photo1} alt=''/>
        <p><strong>Rev.Kwesi Wilson</strong></p>
      <p>Operation Manager</p>
      <p>(Member)</p>
      <p>(Chairman)</p>  
      </div>

      <div className='member'>
        <img  src={photo2} alt=''/>
        <p>
          <strong>Rev.Michael Nhyira</strong>
        </p>
        <p>Head Of Missions</p>
        <p>Memeber</p>
      </div>

      <div className='member'>
        <img src='' alt=''/>
        <p>
          <strong>Madame Gifty Wandem</strong></p>
      <p>Executive Secretary</p>
      <p>Member</p>
      </div>

      <div className='member'>
        <img src='' alt=''/>
        <p>
          <strong>Mr.Brain Elorm Korgah</strong></p>
      <p>Chief Financial Officer</p>
      <p>Member</p>
      </div>

      <div className='member'>
        <img src='' alt=''/>
        <p>
          <strong>Mrs.Margaret Agyei</strong></p>
      <p>Education & Fund</p>
      <p>Member</p>
      </div>

    </div>
  )
}

export default Board2
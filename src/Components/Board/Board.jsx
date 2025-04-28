import React from 'react'
import './Board.css'
import board from '../../assets/CSI_2670 copy.jpg'
import photo from '../../assets/DSC_0528_1728294648605.jpg'
import photo1 from '../../assets/WhatsApp Image 2024-10-18 at 11.14.47_a80ec106.jpg'
import photo2 from '../../assets/IMG-20241018-WA0007.jpg'
const Board = () => {
  return (
    <div className='board'>
      <div className='member'>
        <img src={board} alt=''/>
        <p><strong>Apostle Emmanuel Yaw Asare</strong></p>
        <p>Founder and President</p>
        <p>Emmanuel Asare Ministries</p>
      </div>
      <div className='member'>
        <img src={photo2} alt=''/>
        <p><strong>Mrs. Victoria Akushika Asare</strong></p>
        <p>Chaiperson</p>
      </div>
      <div className='member'>
      <img src={photo} alt='' />
      <p><strong>Rev.Alfred Kwabena Zidol</strong></p>
      <p>Member</p>
      </div>
      <div className="member">
        <img src={photo1} alt='' />
        <p><strong>Rev.Kwesi Wilson</strong></p>
        <p>Member</p>
      </div>
      <div className='member placeholder'>
        <img src='' alt=''/>
        <p><strong>Mrs.Margaret Agyei(ESQ)</strong></p>
      </div>



    </div>

  )
}

export default Board
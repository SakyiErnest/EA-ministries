import React from 'react'
import './Board.css'
import board from '../../assets/CSI_2670 copy.jpg'
import photo from '../../assets/DSC_0528_1728294648605.jpg'
import photo1 from '../../assets/WhatsApp Image 2024-10-18 at 11.14.47_a80ec106.jpg'
import photo2 from '../../assets/IMG-20241018-WA0007.jpg'

const Board = () => {
  // Board member data
  const members = [
    {
      id: 1,
      image: board,
      name: "Apostle Emmanuel Yaw Asare",
      title: "Founder and President",
      organization: "Emmanuel Asare Ministries"
    },
    {
      id: 2,
      image: photo2,
      name: "Mrs. Victoria Akushika Asare",
      title: "Chairperson",
      organization: ""
    },
    {
      id: 3,
      image: photo,
      name: "Rev. Alfred Kwabena Zidol",
      title: "Member",
      organization: ""
    },
    {
      id: 4,
      image: photo1,
      name: "Rev. Kwesi Wilson",
      title: "Member",
      organization: ""
    },
    {
      id: 5,
      image: "",
      name: "Mrs. Margaret Agyei (ESQ)",
      title: "Member",
      organization: ""
    }
  ];

  return (
    <div className='board-grid'>
      {members.map((member) => (
        <div
          key={member.id}
          className={`member-card ${!member.image ? 'placeholder' : ''}`}
        >
          <div className="member-image-container">
            {member.image ? (
              <img src={member.image} alt={member.name} className="member-image" />
            ) : (
              <div className="member-image-placeholder">
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="member-info">
            <h3 className="member-name">{member.name}</h3>
            <p className="member-title">{member.title}</p>
            {member.organization && (
              <p className="member-organization">{member.organization}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Board
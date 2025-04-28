import React from 'react'
import './Board2.css'
import photo1 from '../../assets/WhatsApp Image 2024-10-18 at 11.14.47_a80ec106.jpg'
import photo2 from '../../assets/IMG-20240705-WA0001.jpg'

const Board2 = () => {
  // Board of Trustees member data
  const trustees = [
    {
      id: 1,
      image: photo1,
      name: "Rev. Kwesi Wilson",
      title: "Operations Manager",
      role: "Chairman"
    },
    {
      id: 2,
      image: photo2,
      name: "Rev. Michael Nhyira",
      title: "Head Of Missions",
      role: "Member"
    },
    {
      id: 3,
      image: "",
      name: "Madame Gifty Wandem",
      title: "Executive Secretary",
      role: "Member"
    },
    {
      id: 4,
      image: "",
      name: "Mr. Brain Elorm Korgah",
      title: "Chief Financial Officer",
      role: "Member"
    },
    {
      id: 5,
      image: "",
      name: "Mrs. Margaret Agyei",
      title: "Education & Fund",
      role: "Member"
    }
  ];

  return (
    <div className='board-grid'>
      {trustees.map((trustee) => (
        <div
          key={trustee.id}
          className={`member-card ${!trustee.image ? 'placeholder' : ''}`}
        >
          <div className="member-image-container">
            {trustee.image ? (
              <img src={trustee.image} alt={trustee.name} className="member-image" />
            ) : (
              <div className="member-image-placeholder">
                {trustee.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="member-info">
            <h3 className="member-name">{trustee.name}</h3>
            <p className="member-title">{trustee.title}</p>
            <p className="member-role">{trustee.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Board2
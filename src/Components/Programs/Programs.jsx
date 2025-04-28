import React from 'react'
import './program.css'
import image_5 from '../../assets/image5.jpg'
import image_8 from '../../assets/image8.jpg'
import image_9 from '../../assets/image9.jpg'
import handshake from '../../assets/handshake.png'
import scholarship from '../../assets/scholarship.png'
import book from '../../assets/book.png'
import { FaHandshake, FaGraduationCap, FaBook, FaArrowRight } from 'react-icons/fa'

const Programs = () => {
  const programData = [
    {
      id: 1,
      image: image_5,
      icon: <FaHandshake className="program-icon" />,
      iconImg: handshake,
      title: "Partnership",
      description: "Join our partnership program and help us extend our reach to communities in need through collaborative efforts.",
      link: "#"
    },
    {
      id: 2,
      image: image_8,
      icon: <FaGraduationCap className="program-icon" />,
      iconImg: scholarship,
      title: "Scholarship",
      description: "Our scholarship program provides educational opportunities to deserving students who need financial assistance.",
      link: "#"
    },
    {
      id: 3,
      image: image_9,
      icon: <FaBook className="program-icon" />,
      iconImg: book,
      title: "Books",
      description: "Explore our collection of spiritual books and resources designed to help you grow in your faith journey.",
      link: "#"
    }
  ];

  return (
    <div className='programs-container'>
      {programData.map((program) => (
        <div className="program-card" key={program.id}>
          <div className="program-image-container">
            <img src={program.image} alt={program.title} className="program-image" />
            <div className="program-icon-container">
              {program.icon}
            </div>
          </div>

          <div className="program-content">
            <div className="program-header">
              <img src={program.iconImg} alt="" className="program-icon-img" />
              <h3 className="program-title">{program.title}</h3>
            </div>
            <p className="program-description">{program.description}</p>

            <a href={program.link} className="program-link">
              Learn More <FaArrowRight className="arrow-icon" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Programs
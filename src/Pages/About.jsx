import React from 'react'
import MinistryHistory from '../Components/MinistryHistory/MinistryHistory'
import Board from '../Components/Board/Board'
import Board2 from '../Components/Board2/Board2'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="about-section">
        <MinistryHistory />
      </div>

      <div className="about-section council-section">
        <h1 className="section-title">Executive Council</h1>
        <div className="board-container">
          <Board />
        </div>
      </div>

      <div className="about-section trustees-section">
        <h1 className="section-title">Board Of Trustees</h1>
        <div className="board-container">
          <Board2 />
        </div>
      </div>
    </div>
  )
}

export default About
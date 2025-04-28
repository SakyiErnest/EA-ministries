import React from 'react'
import MinistryHistory from '../Components/MinistryHistory/MinistryHistory'
import Board from '../Components/Board/Board'
import Board2 from '../Components/Board2/Board2'
const About = () => {
  return (
    <div>
      <MinistryHistory />
      <h1>Executive Council</h1>
      <Board />
      <h1>Board Of Trustees</h1>
      <Board2 />
    </div>
  )
}

export default About
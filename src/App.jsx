import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Events from './Pages/Events'
import Sermons from './Pages/Sermons'
import Contact from './Pages/Contact'
import Radio from './Pages/Radio'
import Give from './Pages/Give'
import Scholarship from './Pages/Scholarship'
import Books from './Pages/Books'
import Partnership from './Pages/Partnership'
import { Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/events' element={<Events />} />
        <Route path='/sermons' element={<Sermons />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/radio' element={<Radio />} />
        <Route path='/give' element={<Give />} />
        <Route path='/Scholarship' element={<Scholarship />} />
        <Route path='/Books' element={<Books />} />
        <Route path='/Partnership' element={<Partnership />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
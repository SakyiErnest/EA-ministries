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
import { Routes, Route, Navigate } from 'react-router-dom'
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
        <Route path='/scholarship' element={<Scholarship />} />
        <Route path='/books' element={<Books />} />
        <Route path='/partnership' element={<Partnership />} />

        {/* Backward-compatible redirects for legacy mixed-case links */}
        <Route path='/About' element={<Navigate to='/about' replace />} />
        <Route path='/Events' element={<Navigate to='/events' replace />} />
        <Route path='/Sermons' element={<Navigate to='/sermons' replace />} />
        <Route path='/Contact' element={<Navigate to='/contact' replace />} />
        <Route path='/Radio' element={<Navigate to='/radio' replace />} />
        <Route path='/Give' element={<Navigate to='/give' replace />} />
        <Route path='/Scholarship' element={<Navigate to='/scholarship' replace />} />
        <Route path='/Books' element={<Navigate to='/books' replace />} />
        <Route path='/Partnership' element={<Navigate to='/partnership' replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
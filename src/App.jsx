import { useState } from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'

function App() {
  
    return(
      <div className="bg-light">
        <p style={{position:'fixed',bottom:0,right:0,zIndex:'10000',opacity:0.5}} className='bg-secondary mb-0 d-none d-md-block px-2  p-0 text-light'>feedback</p>
        <Body />
      </div>
    )
}

export default App

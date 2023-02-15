import React from 'react'
import '../StyleComponent/NavBar.css'
import {BrowserRouter as Router , Routes, Route , Link} from 'react-router-dom'
import Connexion from './Connexion'
import About from './About'
import Error from './Error'
// import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    // <Router>
      

    //   <Routes>
    //     <Route path='/' element={
            <nav className='Navbar'>
                <ul className='lists'>
                    {/* <Link>Connexion</Link>
                    <Link >Contact us</Link>
                    <Link>About me</Link> */}
                    <li><Link to='connexion'>Connexion</Link></li>
                    {/* <li><a href='#'>Contact us</a></li> */}
                    <li><Link to='aboutme'>About me</Link></li>
                </ul>
            </nav>
    //       }
    //     /> 
        
    //   </Routes>
    // </Router>
  )
}

export default NavBar
import React from 'react'
import '../StyleComponent/Header.css'
import logo from '../logo.svg';
import NavBar from './NavBar';

const Header  = () => {
  return (
    <div className='Header'>

        <div className='bloc1'>
            <div className='logo'>
                <img src={logo} title='Logo' />
            </div>

            <div className='title'>
                <h1>test</h1>
            </div>
        </div>

        <div className='Navbar'>
            <NavBar />
        </div>
    </div>
  )
}

export default Header
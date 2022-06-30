import React from 'react'
import './Nav.scss'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <nav className='nav'>
       <NavLink className='nav__links' to="/"><h1 className='nav__title'>WeDevelop</h1></NavLink>
      <ul className='nav__list'>
      <NavLink className='nav__links' to="/signup"><li className='nav__options'>Sign Up</li></NavLink>
      <NavLink className='nav__links' to="/login"><li className='nav__options'>Login</li></NavLink>
      </ul>   
    </nav>
  )
}

export default Nav
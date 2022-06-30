import React from 'react'
import './Nav.scss'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <div>
        <NavLink to="/"><button>Homepage</button></NavLink>
        <NavLink to="/signup"><button>Sign Up</button></NavLink>
        <NavLink to="/login"><button>Login</button></NavLink>
    </div>
  )
}

export default Nav
// External modules
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header () {

  return (
    <header>
      <nav>
        <Link to='/home'>Home page</Link>
        <Link to='/about'>About page</Link>
      </nav>
    </header>
  )
}

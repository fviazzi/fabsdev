// External modules
import React from 'react'

// Imports
const Intro = React.lazy(() => (import(/* webpackChunkName: "intro" */'Screens/Intro/Intro')))
const About = React.lazy(() => (import(/* webpackChunkName: "about" */'Screens/About/About')))

const routes = [

  // Public routes
  {
    path: '/',
    label: 'Intro',
    exact: false,
    access: ['public'],
    component: <Intro />
  },
  {
    path: '/about',
    label: 'About',
    exact: false,
    access: ['public'],
    component: <About />
  }
]

export default routes

// External modules
import React from 'react'

// Imports
const Home = React.lazy(() => (import(/* webpackChunkName: "home" */'Screens/Home/Home')))
const About = React.lazy(() => (import(/* webpackChunkName: "about" */'Screens/About/About')))

const routes = [

  // Public routes
  {
    path: '/home',
    label: 'Home',
    exact: false,
    access: ['public'],
    component: <Home />
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

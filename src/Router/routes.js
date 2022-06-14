// External modules
import React from 'react'

// Imports
const Intro  = React.lazy(() => (import(/* webpackChunkName: "intro" */'Screens/Intro/Intro')))
const About  = React.lazy(() => (import(/* webpackChunkName: "about" */'Screens/About/About')))
const Skills = React.lazy(() => (import(/* webpackChunkName: "skills" */'Screens/Skills/Skills')))
const Contact = React.lazy(() => (import(/* webpackChunkName: "contact" */'Screens/Contact/Contact')))

const routes = [

  // Public routes for eng
  {
    path: '/',
    exact: false,
    access: ['public'],
    component: <Intro />
  },
  {
    path: '/about',
    exact: false,
    access: ['public'],
    component: <About />
  },
  {
    path: '/skills',
    exact: false,
    access: ['public'],
    component: <Skills />
  },
  {
    path: '/contact',
    exact: false,
    access: ['public'],
    component: <Contact />
  },

  // Public routes for es
  {
    path: '/acerca-de-mi',
    exact: false,
    access: ['public'],
    component: <About />
  },
  {
    path: '/habilidades',
    exact: false,
    access: ['public'],
    component: <Skills />
  },
  {
    path: '/contacto',
    exact: false,
    access: ['public'],
    component: <Contact />
  }
]

export default routes

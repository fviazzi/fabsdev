// External modules
import React from 'react'

// Imports
const NotFound = React.lazy(() => (import(/* webpackChunkName: "not-found" */'Screens/NotFound/NotFound')))
const Intro    = React.lazy(() => (import(/* webpackChunkName: "intro" */'Screens/Intro/Intro')))
const About    = React.lazy(() => (import(/* webpackChunkName: "about" */'Screens/About/About')))
const Skills   = React.lazy(() => (import(/* webpackChunkName: "skills" */'Screens/Skills/Skills')))
const Work     = React.lazy(() => (import(/* webpackChunkName: "work" */'Screens/Work/Work')))
const Contact  = React.lazy(() => (import(/* webpackChunkName: "contact" */'Screens/Contact/Contact')))

const routes = [

  // Not found
  {
    path: '*',
    exact: false,
    access: ['public'],
    component: <NotFound />
  },

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
    path: '/work',
    exact: false,
    access: ['public'],
    component: <Work />
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
    path: '/trabajos',
    exact: false,
    access: ['public'],
    component: <Work />
  },
  {
    path: '/contacto',
    exact: false,
    access: ['public'],
    component: <Contact />
  }
]

export default routes

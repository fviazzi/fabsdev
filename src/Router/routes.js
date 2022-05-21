// External modules
import React from 'react'

// Imports
const Home = React.lazy(() => (import(/* webpackChunkName: "home" */'Screens/Home/Home')))

const routes = [

  // Public routes
  {
    path: '/*',
    label: 'Home',
    exact: false,
    access: ['public'],
    component: <Home />
  }
]

export default routes

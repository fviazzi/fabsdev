// External modules
import React from 'react'
import { Outlet } from 'react-router-dom'

// Internal modules
import { AppContext } from 'Context'
import './Main.layout.less'

// Components
import Header from 'Components/Header/Header'
import Loader from 'Components/Loader/Loader'

export default function MainLayout () {

  // Global state
  const { state } = React.useContext(AppContext)

  return (
    <main id='main-container' className={state.theme}>
      {state.section !== 'intro' && <Header />}
      <React.Suspense fallback={<Loader />}>
        <Outlet />
      </React.Suspense>
    </main>
  )
}

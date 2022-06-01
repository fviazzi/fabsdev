// External modules
import React from 'react'
import { useLocation, Outlet } from 'react-router-dom'

// Internal modules
import { AppContext } from 'Context'
import './Main.layout.less'

// Components
import Header from 'Components/Header/Header'
import Loader from 'Components/Loader/Loader'

export default function MainLayout () {

  // Global state
  const { state, dispatch } = React.useContext(AppContext)

  // Local state
  const [mounted, setMounted] = React.useState(false)

  // Constants
  const location = useLocation()

  // Mount effect
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Location effect
  React.useEffect(() => {

    const section = location.pathname.replace('/', '')

    dispatch({
      type: 'UPDATE_SECTION',
      data: section.toLowerCase()
    })

  }, [location])

  return (
    mounted &&
      <main
        id='main-container'
        className={`${state.theme} lang-${state.language}`}
      >
        {state.section !== '' && <Header />}
        <React.Suspense fallback={<Loader />}>
          <Outlet />
        </React.Suspense>
      </main>
  )
}

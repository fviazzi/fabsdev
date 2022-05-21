// External modules
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Internal modules
import { AppContext } from 'Context'

// Components
// import Loader from 'Components/Loader/Loader'

export default function Router () {

  // Global state
  const { state } = React.useContext(AppContext)

  // Local state
  const [lazy, setLazy] = React.useState([])

  // Mount effect
  React.useEffect(() => {
    getRoutes()
  }, [])

  // Methods
  const getRoutes = async () => {

    const lazy = await import('./routes.js')

    if (lazy) {
      setLazy(lazy.default)
    }

  }

  return (
    <BrowserRouter>

      <React.Suspense fallback={<div />}>

        <Routes>

          {/* Public routes are always enabled */}
          {
            lazy.filter(route => route.access.includes('public')).map(({ component, path, exact }) =>
              <Route
                exact={exact}
                key={path}
                path={path}
                element={component}
              />
            )
          }

          {/* Filter specific access routes */}
          {
            state.account.access &&
              lazy
                .filter(route => route.access.includes(state.account.access))
                .map(({ component, path, exact }) =>
                  <Route
                    exact={exact}
                    key={path}
                    path={path}
                    element={component}
                  />
                )
          }

        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

// External modules
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// Components
import MainLayout from './Layouts/Main/Main.layout'
import NotFound from 'Screens/NotFound/NotFound'

export default function Router () {

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
      <Routes>

        {/* Main Routes */}
        <Route path='*' element={<NotFound />} />

        {/* Main Routes */}
        <Route path='/' element={<MainLayout />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

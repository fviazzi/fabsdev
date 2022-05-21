// External modules
import React from 'react'

// Internal modules
import './Less/config.less'
import serverMock from './Helpers/Mock/Mock.js'

// Router
import Router from './Router/Router'

// Global state
import { AppProvider } from './App.context.jsx'
import { reducer } from './App.reducer.js'

export default function App () {

  // Declare reducer
  const [state, dispatch] = React.useReducer(...reducer)

  // Mount effect
  React.useEffect(() => {

    // Start mock
    serverMock()

  }, [])

  return (
    <AppProvider value={{ state, dispatch }}>
      <main className={state.theme}>
        <Router />
      </main>
    </AppProvider>
  )
}

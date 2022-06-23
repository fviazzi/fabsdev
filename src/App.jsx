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

    // Recover theme
    if (localStorage.getItem('theme')) {
      dispatch({
        type: 'UPDATE_THEME',
        data: localStorage.getItem('theme')
      })
    }

    // Recover language
    if (localStorage.getItem('lang')) {
      dispatch({
        type: 'UPDATE_LANG',
        data: localStorage.getItem('lang')
      })
    } else {
      // Try to detect spanish
      const language = navigator.language || navigator.userLanguage

      if (language.includes('es')) {
        dispatch({
          type: 'UPDATE_LANG',
          data: 'es'
        })
      }
    }

  }, [])

  return (
    <AppProvider value={{ state, dispatch }}>
      <Router />
    </AppProvider>
  )
}

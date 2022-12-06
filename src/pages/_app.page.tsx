// External modules
import React from 'react'
import type { AppProps } from 'next/app'

// Global state
import { AppProvider } from 'src/context/app.context'
import { reducer, initialState } from 'src/context/app.reducer'

export default function App({ Component, pageProps }: AppProps) {

  // Declare reducer
  const [state, dispatch] = React.useReducer(reducer, initialState)

  // Mount effect
  React.useEffect(() => {

    // Recover theme
    if (localStorage.getItem('theme')) {
      dispatch({
        type: 'UPDATE_THEME',
        data: localStorage.getItem('theme') === 'ligth-theme' ? 'light-theme' : 'dark-theme'
      })
    }

    // Recover language
    if (localStorage.getItem('lang')) {
      dispatch({
        type: 'UPDATE_LANG',
        data: localStorage.getItem('lang') === 'en' ? 'en' : 'es'
      })
    } else {

      // Try to detect spanish
      const language = navigator.language

      if (language.includes('es')) {
        dispatch({
          type: 'UPDATE_LANG',
          data: 'es'
        })
      }
    }

  }, [])

  return (
    <React.StrictMode>
      <AppProvider value={{ state, dispatch }}>
        <Component {...pageProps} />
      </AppProvider>
    </React.StrictMode>
  )
}

// External modules
import React from 'react'

// Internal modules
import './Home.less'
import { AppContext } from 'Context'

export default function Home () {

  // Global state
  const { state, dispatch } = React.useContext(AppContext)

  // Methods
  const toggleTheme = () => {

    // Update global state
    const theme = state.theme === 'light-theme' ? 'dark-theme' : 'light-theme'

    dispatch({
      type: 'UPDATE_THEME',
      data: theme
    })
  }

  return (
    <section id='home-container'>
      <h1>
        This is the home page!!
      </h1>

      <h2>
        Theme is {state.theme}
      </h2>

      <button
        onClick={toggleTheme}
      >
        Toggle theme
      </button>
    </section>
  )
}

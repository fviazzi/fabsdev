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

  const flip = e => {

    const element = e.target

    element.classList.add('flip')

    setTimeout(() => {
      element.classList.remove('flip')
    }, 600)
  }

  return (
    <section id='home-container'>

      <h4>
        <span onMouseEnter={flip}>H</span>
        <span onMouseEnter={flip}>E</span>
        <span onMouseEnter={flip}>Y</span>
        <span onMouseEnter={flip}>!</span>
      </h4>

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

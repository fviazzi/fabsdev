// External modules
import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

// Internal modules
import './Header.less'
import { AppContext } from 'Context'

// Components
import Toggle from './Toggle/Toggle'

export default function Header () {

  // Global state
  const { state, dispatch } = React.useContext(AppContext)

  // Local state
  const [mounted, setMounted] = React.useState(false)

  // Constants
  const links = ['About', 'Skills', 'Work', 'Contact']

  // Mount effect
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Methods
  const toggleTheme = () => {

    // Update global state
    const theme = state.theme === 'light-theme' ? 'dark-theme' : 'light-theme'

    dispatch({
      type: 'UPDATE_THEME',
      data: theme
    })

    localStorage.setItem('theme', theme)
  }

  return (
    <CSSTransition
      timeout={0}
      classNames='header'
      unmountOnExit
      in={mounted}
    >
      <header id='main-header'>
        <nav>
          <Link
            to='/'
            className={state.section === 'intro' ? 'active' : ''}
          >
            Home
          </Link>

          {/* Map links */}
          {
            links.map(link => (
              <Link
                key={link.toLowerCase()}
                to={`/${link.toLowerCase()}`}
                className={state.section === link.toLowerCase() ? 'active' : ''}
              >
                {link}
              </Link>
            ))
          }
        </nav>

        <button
          onClick={toggleTheme}
        >
          <Toggle />
        </button>
      </header>
    </CSSTransition>
  )
}

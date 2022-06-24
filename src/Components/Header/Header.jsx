// External modules
import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

// Internal modules
import './Header.less'
import i18n from './header.i18n.json'
import { AppContext } from 'Context'

// Components
import Toggle from './Toggle/Toggle'
import LanguageToggle from 'Components/LanguageToggle/LanguageToggle'

export default function Header () {

  // Global state
  const { state, dispatch } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [mounted, setMounted] = React.useState(false)
  const [openNav, setOpenNav] = React.useState(false)

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

  const navigate = () => {

    // Close header
    setOpenNav(false)

    // Scroll to form position
    setTimeout(() => {
      const container = document.getElementById('main-container')
      container.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, 0)

  }

  return (
    <CSSTransition
      timeout={300}
      classNames='header'
      unmountOnExit
      in={mounted}
    >
      <header
        id='main-header'
        className={
          openNav
            ? 'header-enter-done nav-open'
            : 'header-enter-done'
        }
      >

        {/* Mobile btn */}
        <button
          id='toggle-nav-btn'
          onClick={() => setOpenNav(!openNav)}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z' /></svg>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z' /></svg>
        </button>

        {/* Menu */}
        <nav>
          {/* Map links */}
          {
            i18n[lang].links.map(link => (
              <Link
                key={link.path}
                to={`/${link.path}`}
                className={
                  (state.section === link.path || state.section === link.translate)
                    ? 'active'
                    : ''
                }
                onClick={navigate}
              >
                {link.label}
              </Link>
            ))
          }
        </nav>

        {/* Theme/Language selectors */}
        <div>

          {/* Theme selector */}
          <button
            id='toggle-theme-btn'
            onClick={toggleTheme}
          >
            <Toggle />
          </button>

          {/* Language selector */}
          <LanguageToggle />
        </div>
      </header>
    </CSSTransition>
  )
}

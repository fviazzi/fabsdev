// External modules
import React from 'react'

// Internal modules
import './LanguageToggle.less'
import { AppContext } from 'Context'

export default function LanguageToggle () {

  // Global state
  const { state, dispatch } = React.useContext(AppContext)
  const lang = state.language

  // Methods
  const toggle = () => {

    // Update global state
    const lang = state.language === 'en' ? 'es' : 'en'

    dispatch({
      type: 'UPDATE_LANG',
      data: lang
    })

    localStorage.setItem('lang', lang)
  }

  return (
    <button
      id='toggle-lang-btn'
      className={lang === 'en' ? '' : 'reverse'}
      onClick={toggle}
    >
      <span>EN</span>
      <span>ES</span>
    </button>
  )
}

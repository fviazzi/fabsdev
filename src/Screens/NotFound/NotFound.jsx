// External modules
import React from 'react'
import Lottie from 'lottie-react'

// Internal modules
import './NotFound.less'
import i18n from './notFound.i18n.json'
import { AppContext } from 'Context'

// Components
import AnimatedSpace from 'Components/AnimatedSpace/AnimatedSpace'

// Assets
import notFound from './notFound.animation.json'

export default function NotFound () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  return (
    <main
      id='main-container'
      className={`${state.theme} lang-${state.language}`}
    >
      <section id='not-found-container' className='page-container'>

        {/* Background */}
        <AnimatedSpace blur />

        {/* Not found container */}
        <div className='container'>

          {/* Animation */}
          <Lottie
            animationData={notFound}
            loop
            autoplay
          />

          <h1>{i18n[lang].title}</h1>

          <p>{i18n[lang].content}</p>

          <a className='main-btn' href='/'>
            {i18n[lang].button}
          </a>
        </div>
      </section>
    </main>
  )
}

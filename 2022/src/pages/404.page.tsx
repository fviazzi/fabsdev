// External modules
import React from 'react'
import Lottie from 'lottie-react'

// Internal modules
import './404.less'
import i18n from './404.i18n.json'
import { AppContext } from 'src/context/app.context'

// Components
import Layouts from 'src/components/layouts/layouts'
import AnimatedSpace from 'src/components/animatedSpace/animatedSpace'

// Assets
import notFound from './404.animation.json'

export default function NotFound () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  return (
    <Layouts title='Page not found'>
      <Layouts.Information>
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
          </div>
        </section>
      </Layouts.Information>
    </Layouts>
  )
}

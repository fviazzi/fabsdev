// External modules
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import Lottie from 'lottie-react'

// Internal modules
import './About.less'
import i18n from './about.i18n.json'
import { AppContext } from 'Context'

// Components
import AnimatedSpace from 'Components/AnimatedSpace/AnimatedSpace'

// Assets
import moon from './moon.json'
import planet from './planet.json'
import profile from './profile.png'
import galaxyShape from './galaxy-shape.png'

export default function About () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [mounted, setMounted] = React.useState(false)

  // Mount effect
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CSSTransition
      timeout={0}
      classNames='about'
      unmountOnExit
      in={mounted}
    >
      <section id='about-container' className='page-container'>

        {/* Background */}
        <AnimatedSpace blur />

        <div className='container'>

          <div className='content'>

            <h1>{i18n[lang].title}</h1>

            {
              i18n[lang].content.map((content, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ))
            }
          </div>

          <div className='graphics'>

            {/* Galaxy */}
            <img src={galaxyShape} alt='Shape Background' />

            {/* Profile */}
            <div className='profile-container'>

              <Lottie
                animationData={moon}
                loop
                autoplay
              />

              <img src={profile} alt='My Profile picture' />

              <Lottie
                animationData={planet}
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </section>
    </CSSTransition>
  )
}

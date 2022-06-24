// External modules
import React from 'react'
import Lottie from 'lottie-react'

// Internal modules
import './About.less'
import i18n from './about.i18n.json'
import { AppContext } from 'Context'

// Components
import AnimatedSpace from 'Components/AnimatedSpace/AnimatedSpace'

// Assets
import moon from './moon.animation.json'
import planet from './planet.animation.json'
import profile from './profile.png'
import galaxyShape from './galaxy-shape.png'

export default function About () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [enter, setEnter] = React.useState(false)

  // Methods
  const showImg = e => {
    e.target.classList.add('enter')
  }

  return (
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
          <img
            src={galaxyShape}
            alt='Shape Background'
            onLoad={e => {
              showImg(e)
              setEnter(true)
            }}
          />

          {/* Profile */}
          <div className={`profile-container ${enter ? 'enter' : ''}`}>

            <Lottie
              animationData={moon}
              loop
              autoplay
            />

            <img
              src={profile}
              alt='My Profile picture'
              onLoad={showImg}
            />

            <Lottie
              animationData={planet}
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// External modules
import React from 'react'
import Lottie from 'lottie-react'
import Image from 'next/image'

// Internal modules
import './about.less'
import i18n from './about.i18n.json'
import { AppContext } from 'src/context/app.context'

// Components
import Layouts from 'src/components/layouts/layouts'
import AnimatedSpace from 'src/components/animatedSpace/animatedSpace'

// Assets
import moon from 'public/img/about/moon.animation.json'
import planet from 'public/img/about/planet.animation.json'
import profile from 'public/img/about/profile.png'
import galaxyShape from 'public/img/about/galaxy-shape.png'

export default function About () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [enter, setEnter] = React.useState(false)

  // Methods
  const showImg = (e:any) => {
    e.target.classList.add('enter')
  }

  return (
    <Layouts title='About'>
      <Layouts.Information>
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
              <div className='galaxy-image-container'>
                <Image
                  src={galaxyShape}
                  alt='Shape Background'
                  onLoad={e => {
                    showImg(e)
                    setEnter(true)
                  }}
                  fill
                />
              </div>

              {/* Profile */}
              <div className={`profile-container ${enter ? 'enter' : ''}`}>

                <Lottie
                  animationData={moon}
                  loop
                  autoplay
                />

                <div className='profile-image-container'>
                  <Image
                    src={profile}
                    alt='My Profile picture'
                    fill
                    onLoad={showImg}
                  />
                </div>

                <Lottie
                  animationData={planet}
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>
        </section>
      </Layouts.Information>
    </Layouts>
  )
}

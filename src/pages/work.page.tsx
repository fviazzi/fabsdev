// External modules
import React from 'react'
import Image, { StaticImageData } from 'next/image'

// Internal modules
import './work.less'
import * as language from './work.i18n.json'
import { AppContext } from 'src/context/app.context'

// Components
import Layouts from 'src/components/layouts/layouts'
import AnimatedSpace from 'src/components/animatedSpace/animatedSpace'

// Assets
import agency from 'public/img/work/agency.png'
import appliance from 'public/img/work/appliance.png'
import biggame from 'public/img/work/biggame.png'
import buckedup from 'public/img/work/buckedup.png'
import muna from 'public/img/work/muna.png'
import stim from 'public/img/work/stim.png'

// Types
type TImages = {
  [key: string]: StaticImageData
}

type TWork = {
  code: string
  title: string
  dates: string
  description: string
  iframeLoaded?: boolean
}

type TI18n = {
  en: {
    title: string
    list: TWork[]
  }
  es: {
    title: string
    list: TWork[]
  }
}

// Constants
const images:TImages = {
  agency,
  appliance,
  biggame,
  buckedup,
  muna,
  stim
}

const i18n:TI18n = language

export default function Work () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [active, setActive] = React.useState<TWork | null>(null)
  const [leave, setLeave]   = React.useState<boolean>(false)

  // Mount effect
  React.useEffect(() => {
    setActive(i18n[lang].list[0])
  }, [lang])

  // Active effect for iframes
  React.useEffect(() => {

    if (active) {

      const activeContainer = document.getElementById('active-work')

      if (activeContainer) {

        const iframes = activeContainer.querySelectorAll('iframe')

        iframes.forEach(iframe => {
          iframe.addEventListener('load', iframeLoad)
        })

      }
    }

    function iframeLoad () {
      if (active) {
        setActive({ ...active, iframeLoaded: true })
      }
    }

  }, [active])

  // Methods
  const changeActive = (newActive:TWork) => {

    if (active && active.code !== newActive.code) {

      setLeave(true)

      setTimeout(() => {
        setLeave(false)
        setActive(newActive)
      }, 300)
    }
  }

  return (
    <Layouts title='About'>
      <Layouts.Information>
        <section id='work-container' className='page-container'>

          {/* Background */}
          <AnimatedSpace blur />

          <div className='container'>

            {/* List */}
            <div id='work-list' className='content'>

              <h1>{i18n[lang].title}</h1>

              {/* Work list */}
              <ul id='work-list'>
                {
                  i18n[lang].list.map(work => (
                    <li
                      key={work.code}
                      className={`
                        ${active && (work.code === active.code) && 'active'}
                        
                      `}
                      onClick={() => changeActive(work)}
                    >
                      <Image
                        src={images[work.code]}
                        alt={work.title}
                        fill
                      />
                    </li>
                  ))
                }
              </ul>
            </div>

            {/* Active */}
            <div
              id='active-work'
              className={`
                content
                ${leave ? 'leave' : 'enter'}
                ${active && active.iframeLoaded ? '' : 'loading-iframe'}
              `}
            >
              {
                active &&
                  <>
                    <h1>{active.title}</h1>
      
                    <h4>{active.dates}</h4>
      
                    <div
                      className='active-description-container'
                      dangerouslySetInnerHTML={{
                        __html: active.description
                      }}
                    />
                  </>
              }
            </div>
          </div>
        </section>
      </Layouts.Information>
    </Layouts>
  )
}

// External modules
import React from 'react'

// Internal modules
import './Work.less'
import i18n from './work.i18n.json'
import { AppContext } from 'Context'

// Components
import AnimatedSpace from 'Components/AnimatedSpace/AnimatedSpace'

// Assets
import agency from './agency.png'
import appliance from './appliance.png'
import biggame from './biggame.png'
import buckedup from './buckedup.png'
import muna from './muna.png'
import stim from './stim.png'

export default function Work () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [active, setActive] = React.useState({})
  const [leave, setLeave]   = React.useState(false)

  // Mount effect
  React.useEffect(() => {
    setActive(i18n[lang].list[0])
  }, [])

  // Active effect for iframes
  React.useEffect(() => {

    const iframes = document.getElementById('active-work').querySelectorAll('iframe')

    iframes.forEach(iframe => {
      iframe.addEventListener('load', iframeLoad)
    })

  }, [active])

  // Constants
  const images = {
    agency,
    appliance,
    biggame,
    buckedup,
    muna,
    stim
  }

  // Methods
  const changeActive = newActive => {

    if (active.code !== newActive.code) {

      setLeave(true)

      setTimeout(() => {
        setLeave(false)
        setActive(newActive)
      }, 300)
    }
  }

  const iframeLoad = () => {
    setActive({ ...active, iframeLoaded: true })
  }

  return (
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
                    ${work.code === active.code && 'active'}
                    
                  `}
                  onClick={() => changeActive(work)}
                >
                  <img src={images[work.code]} alt={work.title} />
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
            ${active.iframeLoaded ? '' : 'loading-iframe'}
          `}
        >

          <h1>{active.title}</h1>

          <h4>{active.dates}</h4>

          <div
            className='active-description-container'
            dangerouslySetInnerHTML={{
              __html: active.description
            }}
          />
        </div>
      </div>
    </section>
  )
}

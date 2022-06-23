// External modules
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Internal modules
import './Intro.less'
import i18n from './intro.i18n.json'
import { AppContext } from 'Context'

// Components
import AnimatedSpace from 'Components/AnimatedSpace/AnimatedSpace'
import LanguageToggle from 'Components/LanguageToggle/LanguageToggle'
import Rocket from './Rocket/Rocket'

// Assets
import rocket from './rocket.svg'

export default function Intro () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [leave, setLeave]           = React.useState(false)
  const [launch, setLaunch]         = React.useState(false)
  const [postLaunch, setPostLaunch] = React.useState(false)

  // Constants
  const navigate = useNavigate()

  // Leave effect
  React.useEffect(() => {
    if (leave) {
      setTimeout(() => {

        setLaunch(true)

        setTimeout(() => {
          setPostLaunch(true)

          setTimeout(() => {

            navigate('about')

          }, 2500)
        }, 3000)
      }, 1000)
    }
  }, [leave])

  return (
    <section
      id='intro-container'
      className={`
        ${leave ? 'leave' : ''}
        ${postLaunch ? 'post-launch' : ''}
      `}
    >

      {/* Background */}
      <AnimatedSpace
        planets
        blur={!launch}
        scale={postLaunch}
      />

      {/* Language toggle */}
      <LanguageToggle />

      {/* Content */}
      <div className='container'>
        <div>

          <h1>{i18n[lang].title}</h1>

          {
            i18n[lang].content.map((content, index) => (
              <p key={index}>{content}</p>
            ))
          }

          <button onClick={() => setLeave(true)}>
            {i18n[lang].button}
            <img src={rocket} />
          </button>
        </div>
      </div>

      {/* Rocket */}
      <div id='rocket-container'>
        {
          launch && !postLaunch && <Rocket />
        }
      </div>
    </section>
  )
}

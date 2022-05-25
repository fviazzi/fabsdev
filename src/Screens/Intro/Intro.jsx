// External modules
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Internal modules
import './Intro.less'
import { AppContext } from 'Context'

// Components
import Space from './Space/Space'
import Rocket from './Rocket/Rocket'

// Assets
import rocket from './rocket.svg'

export default function Intro () {

  // Global state
  const { dispatch } = React.useContext(AppContext)

  // Local state
  const [orientation, setOrientation] = React.useState('landscape')
  const [leave, setLeave]             = React.useState(false)
  const [launch, setLaunch]           = React.useState(false)
  const [postLaunch, setPostLaunch]   = React.useState(false)

  // Constants
  const navigate = useNavigate()

  // Mount effect
  React.useEffect(() => {

    dispatch({
      type: 'UPDATE_SECTION',
      data: 'intro'
    })

    window.addEventListener('resize', resizeHandler)

    // Run the handler for the first time
    resizeHandler()

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

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

  // Methods
  const resizeHandler = () => {

    const ratio = window.innerWidth / window.innerHeight

    if (ratio >= 1.7777777) {
      setOrientation('landscape')
    } else {
      setOrientation('portrait')
    }
  }

  return (
    <section
      id='intro-container'
      className={`
        ${leave ? 'leave' : ''}
        ${postLaunch ? 'post-launch' : ''}
        ${orientation}
      `}
    >

      {/* Background */}
      <div id='intro-background-container'>
        <div className='mask' />
        <Space />
      </div>

      {/* Content */}
      <div className='container'>
        <div>

          <h1>
            Hey, welcome!
          </h1>

          <p>
            Thank you for stepping by.
          </p>

          <p>
            I thought it could be fun to tell my story with a space themed website.
          </p>

          <p>
            I hope you enjoy it!
          </p>

          <button onClick={() => setLeave(true)}>
            Let's go!
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

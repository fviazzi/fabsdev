// External modules
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Internal modules
import './Intro.less'

// Components
import AnimatedSpace from 'Components/AnimatedSpace/AnimatedSpace'
import Rocket from './Rocket/Rocket'

// Assets
import rocket from './rocket.svg'

export default function Intro () {

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
